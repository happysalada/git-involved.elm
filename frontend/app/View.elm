module View exposing (..)

import Html exposing (Html, button, div, h1, a, p, span, text)
import Html.Attributes exposing (class, style, href, id)
import Html.Events exposing (onClick)
import Models exposing (Model)
import Messages exposing (Message(..))
import RemoteData exposing (WebData)
import Commands exposing (repoNameFromUrl, dateFrom)
import Material
import Material.Button as Button
import Material.Menu as Menu
import Material.Textfield as Textfield
import Material.Options as Options exposing (css, cs, when, styled)


view : Model -> Html Message
view model =
    div []
        [ page model ]


page : Model -> Html Message
page model =
    case model.route of
        Models.MainPage ->
            mainPage model

        Models.AboutPage ->
            aboutPage

        Models.NotFoundRoute ->
            notFoundView


mainPage : Model -> Html Message
mainPage model =
    Html.body [ class "mdl-color-text--grey-700" ]
        [ div [ class "page-layout" ]
            [ styled Html.header
                [ cs "mdl-color--primary"
                , css "grid-area" "header"
                , css "color" "rgb(255,255,255)"
                ]
                [ styled div
                    [ css "margin-left" "1rem" ]
                    [ Html.h5 [] [ text "Git-Back" ] ]
                , styled div
                    [ css "text-align" "center"
                    , css "margin-top" "5rem"
                    ]
                    [ Html.h3 [] [ text "Contribute to open source" ] ]
                , styled div
                    [ css "text-align" "center"
                    , css "margin-bottom" "3rem"
                    ]
                    [ Html.h6 [] [ text "Help out on unassigned open issues" ] ]
                ]
            , styled div
                [ cs "mdl-color--grey-100"
                , css "grid-area" "sidebar"
                ]
                []
            , styled div
                [ cs "mdl-color--grey-100"
                , css "grid-area" "sidebar2"
                ]
                []
            , styled Html.main_
                [ cs "mdl-shadow--4dp"
                , css "grid-area" "content"
                , css "padding" "1rem"
                ]
                [ styled div
                    [ css "display" "flex"
                    , css "flex-direction" "row"
                    , css "justify-content" "center"
                    ]
                    [ mdlTextfield model
                    , styled div
                        [ css "margin-top" "20px"
                        , css "margin-left" "1rem"
                        ]
                        [ text ("Order by: " ++ toString model.orderBy) ]
                    , mdlMenu model.mdl
                    ]
                , div [ class "issues-section" ] (maybeIssueSearchResult model)
                ]
            ]
        ]


maybeIssueSearchResult : Model -> List (Html Message)
maybeIssueSearchResult model =
    case model.issuesSearchResult of
        RemoteData.NotAsked ->
            [ text "" ]

        RemoteData.Loading ->
            [ text "Loading..." ]

        RemoteData.Success issueSearchResult ->
            List.map issueDiv issueSearchResult.issues
                |> List.map (\f -> f model.mdl)

        RemoteData.Failure error ->
            [ text (toString error) ]


issueDiv : Models.Issue -> Material.Model -> Html Message
issueDiv issue mdl =
    styled div
        [ cs "issue-card mdl-cell--12-col mdl-shadow--2dp"
        , css "display" "flex"
        , css "width" "100%"
        , css "margin" "2rem 0px"
        , css "border-radius" "5px"
        ]
        [ div [ class "content mdl-cell--10-col" ]
            [ styled div
                [ css "padding" "0rem 2rem 0rem 2rem"
                , css "width" "auto"
                , cs "mdl-card__supporting-text"
                ]
                [ styled Html.h3
                    [ cs "title"
                    , css "margin-top" "1rem"
                    ]
                    [ text issue.title ]
                , styled div
                    [ cs "body"
                    , css "min-height" "5rem"
                    , css "height" "auto"
                    , css "overflow" "hidden"
                    ]
                    [ if String.isEmpty issue.body then
                        text "No description"
                      else
                        text issue.body
                    ]
                ]
            , styled div
                [ css "display" "flex"
                , css "flex-direction" "row"
                , css "align-items" "center"
                , cs "mdl-card__actions"
                ]
                [ issueCardAction issue
                , div [ class "issue-labels" ] (List.map labelDiv issue.labels)
                ]
            ]
        , styled div
            [ cs "repo mdl-cell--3-col"
            , css "padding" "1rem"
            ]
            [ div [ class "" ]
                [ Html.h5 [ class "title" ] [ text (repoNameFromUrl issue.repository_url) ]
                ]
            ]
        ]


issueCardAction : Models.Issue -> Html Message
issueCardAction issue =
    styled div
        [ css "padding" "1rem" ]
        [ text ("opened this issue on " ++ (dateFrom issue.createdAt) ++ " - " ++ (toString issue.commentCount) ++ " comments") ]


mdlButton : Models.Issue -> Material.Model -> Html Message
mdlButton issue mdlModel =
    Button.render Mdl
        [ issue.id ]
        mdlModel
        [ Button.ripple
        , Button.flat
        , Options.onClick ButtonClick
        ]
        [ text ("Comments: " ++ toString issue.commentCount) ]


mdlTextfield : Model -> Html Message
mdlTextfield model =
    Textfield.render Mdl
        [ 17 ]
        model.mdl
        [ Textfield.label "Show me repos using"
        , Textfield.floatingLabel
        , Textfield.value model.language
        , Textfield.autofocus
        , Options.onInput ChangeLanguage
        ]
        []


mdlMenu : Material.Model -> Html Message
mdlMenu mdlModel =
    Menu.render Mdl
        [ 1, 2, 3, 4 ]
        mdlModel
        [ Menu.ripple
        , Menu.bottomRight
        , Menu.icon "arrow_drop_down"
        , Options.css "margin-top" "1rem"
        ]
        [ Menu.item
            [ Menu.onSelect (SelectOrderBy Models.LastUpdated) ]
            [ text "Last updated" ]
        , Menu.item
            [ Menu.onSelect (SelectOrderBy Models.MostPopular) ]
            [ text "Most popular" ]
        ]


labelDiv : Models.Label -> Html Message
labelDiv label =
    styled span
        [ css "text-align" "center"
        , css "background-color" ("#" ++ label.color)
        , css "margin" "0.1rem"
        , cs "mdl-chip"
        ]
        [ span [ class "mdl-chip__text" ] [ text (label.name) ] ]


aboutPage : Html Message
aboutPage =
    div [ class "jumbotron" ]
        [ div [ class "container" ]
            [ h1 [] [ text "This is <about> page" ]
            , button [ onClick Messages.GoToMainPage, class "btn btn-primary btn-lg" ] [ text "Go To Main Page" ]
            ]
        ]


notFoundView : Html msg
notFoundView =
    div []
        [ text "Not found"
        ]
