module View exposing (..)

import Html exposing (Html, button, div, h1, span, text)
import Html.Attributes exposing (class, style, id, attribute)
import Html.Events exposing (onClick)
import Helpers exposing (contrastColor)
import Models exposing (Model)
import Messages exposing (Message(..))
import Update
import Autocomplete
import Autocomplete.DefaultStyles as DefaultStyles
import RemoteData exposing (WebData)
import Json.Decode as Json
import Commands exposing (repoNameFromUrl, dateFrom, defaultIssues)
import Material
import Material.Menu as Menu
import Material.Textfield as Textfield
import Material.Options as Options exposing (css, cs, styled)
import Color
import Element exposing (..)
import Element.Attributes exposing (..)
import Style exposing (..)
import Style.Border as Border
import Style.Color as Color
import Style.Font as Font
import Style.Transition as Transition


type Styles
    = None
    | Nav
    | Logo
    | Hero
    | Title
    | Subtitle
    | Main
    | IssueContainer
    | Issue


gitbackColors : { darkIndigo : Color.Color, indigo : Color.Color }
gitbackColors =
    { indigo = Color.rgba 63 81 181 1
    , darkIndigo = Color.rgba 0 41 132 1
    }


stylesheet : StyleSheet Styles variation
stylesheet =
    Style.stylesheet
        [ Style.style None [] -- It's handy to have a blank style
        , Style.style Nav
            [ Font.size 16
            , paddingHint 10
            , Font.typeface [ "helvetica", "arial", "sans-serif" ]
            , Color.background gitbackColors.darkIndigo
            ]
        , Style.style Logo
            [ Font.size 20
            , Color.text Color.white
            , Font.lineHeight 1.3
            ]
        , Style.style Hero
            [ Font.size 16
            , Font.center
            , Font.lineHeight 1.3
            , Font.typeface [ "helvetica", "arial", "sans-serif" ]
            , Color.background gitbackColors.indigo
            , Color.text Color.white
            ]
        , Style.style Title
            [ Font.size 40
            ]
        , Style.style Subtitle
            []
        , Style.style Main
            [ Border.all 1 -- set all border widths to 1 px.
            , Color.text Color.darkCharcoal
            , Color.background Color.white
            , Color.border Color.lightGrey
            , Font.typeface [ "helvetica", "arial", "sans-serif" ]
            , Font.size 16
            , Font.lineHeight 1.3 -- line height, given as a ratio of current font size.
            ]
        , Style.style Issue
            [ Transition.all
            , Color.text Color.white
            , Color.background Color.blue
            , Color.border Color.blue
            , Border.rounded 3 -- round all borders to 3px
            , paddingHint 20
            , hover
                [ Color.text Color.white
                , Color.background Color.red
                , Color.border Color.red
                , cursor "pointer"
                ]
            ]
        ]


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
    Html.body [ Html.Attributes.class "mdl-color-text--grey-700" ]
        [ div [ Html.Attributes.class "page-layout mdl-color--grey-200" ]
            [ Element.root stylesheet <|
                column None
                    []
                    [ nav <|
                        row Nav
                            []
                            [ el Logo [] (Element.text "Git Back") ]
                    , header <|
                        column Hero
                            [ verticalCenter, width (fill 1), height (px 200), spacing 16 ]
                            [ el Title [] (Element.text "Contribute to open source")
                            , el Subtitle [] (Element.text "Help out on unassigned open issues")
                            ]
                    ]
            , styled Html.main_
                [ cs "p2 mx-auto max-width-4" ]
                [ styled div
                    [ cs "flex flex-wrap justify-center" ]
                    [ autoComplete model
                    , styled div
                        [ cs "mt3 ml2 flex" ]
                        [ Html.text "Order by:"
                        , Html.text (toString model.orderIssuesBy)
                        , mdlMenu model.mdl
                        ]
                    ]
                , div [] (maybeIssueSearchResult model)
                ]
            ]
        ]


maybeIssueSearchResult : Model -> List (Html Message)
maybeIssueSearchResult model =
    case model.issues of
        RemoteData.NotAsked ->
            [ Html.text "" ]

        RemoteData.Loading ->
            List.map issueDiv defaultIssues
                |> List.map (\f -> f model.mdl)

        RemoteData.Success issues ->
            List.map issueDiv issues
                |> List.map (\f -> f model.mdl)

        RemoteData.Failure error ->
            [ Html.text (toString error) ]


issueDiv : Models.Issue -> Material.Model -> Html Message
issueDiv issue mdl =
    styled div
        [ cs "issue-card fit rounded flex my3 mdl-shadow--2dp mdl-color--white" ]
        [ div [ Html.Attributes.class "content col col-10" ]
            [ styled div
                [ cs "fit py0 px3 mdl-card__supporting-text"
                , css "width" "auto"
                ]
                [ styled Html.h3
                    [ cs "mt2" ]
                    [ Html.text issue.title ]
                , styled div
                    [ cs "body overflow-hidden" ]
                    [ if String.isEmpty issue.body then
                        Html.text "No description"
                      else
                        Html.text issue.body
                    ]
                ]
            , styled div
                [ cs "flex items-center mdl-card__actions" ]
                [ issueCardAction issue
                , div [] (List.map labelDiv issue.labels)
                ]
            ]
        , styled div
            [ cs "repo fit p2 col col-2 xs-hide"
            , css "overflow-wrap" "break-word"
            ]
            [ Html.h5 [] [ Html.text (repoNameFromUrl issue.repository_url) ]
            ]
        ]


issueCardAction : Models.Issue -> Html Message
issueCardAction issue =
    styled div
        [ cs "p2" ]
        [ Html.text ("opened this issue on " ++ dateFrom issue.createdAt ++ " - " ++ toString issue.commentCount ++ " comments") ]


autoComplete : Model -> Html Message
autoComplete model =
    let
        options =
            { preventDefault = True, stopPropagation = False }

        dec =
            Json.map
                (\code ->
                    if code == 38 || code == 40 then
                        Ok NoOp
                    else if code == 27 then
                        Ok HandleEscape
                    else
                        Err "not handling that key"
                )
                Html.Events.keyCode
                |> Json.andThen
                    fromResult

        fromResult : Result String a -> Json.Decoder a
        fromResult result =
            case result of
                Ok val ->
                    Json.succeed val

                Err reason ->
                    Json.fail reason

        menu =
            if model.showLanguageMenu then
                [ viewMenu model ]
            else
                []

        query =
            case model.selectedLanguage of
                Just language ->
                    language

                Nothing ->
                    model.languageQuery
    in
        div []
            (List.append
                [ Textfield.render Mdl
                    [ 17 ]
                    model.mdl
                    [ Textfield.label "Show me repos using"
                    , Textfield.floatingLabel
                    , Textfield.value query
                    , Textfield.autofocus
                    , Options.onInput SetQuery
                    , Options.id "autocomplete-input"
                    , Options.attribute <| Html.Attributes.attribute "aria-label" "Show me repos using"
                    ]
                    []
                ]
                menu
            )


viewMenu : Model -> Html Message
viewMenu model =
    div
        [ Html.Attributes.style DefaultStyles.menuStyles ]
        [ Html.map SetAutoState (Autocomplete.view viewConfig 5 model.autocompleteState (Update.languageMatches model.languageQuery)) ]


viewConfig : Autocomplete.ViewConfig String
viewConfig =
    let
        customizedLi keySelected mouseSelected language =
            { attributes =
                [ if keySelected || mouseSelected then
                    Html.Attributes.style DefaultStyles.selectedItemStyles
                  else
                    Html.Attributes.style DefaultStyles.itemStyles
                , Html.Attributes.id language
                ]
            , children = [ Html.text language ]
            }
    in
        Autocomplete.viewConfig
            { toId = identity
            , ul = [ Html.Attributes.style DefaultStyles.listStyles ]
            , li = customizedLi
            }


mdlMenu : Material.Model -> Html Message
mdlMenu mdlModel =
    Menu.render Mdl
        [ 1, 2, 3, 4 ]
        mdlModel
        [ Menu.ripple
        , Menu.bottomRight
        , Menu.icon "arrow_drop_down"
        ]
        [ Menu.item
            [ Menu.onSelect (SetOrderIssuesBy Models.LastUpdated) ]
            [ Html.text "Last updated" ]
        , Menu.item
            [ Menu.onSelect (SetOrderIssuesBy Models.MostPopular) ]
            [ Html.text "Most popular" ]
        ]


labelDiv : Models.Label -> Html Message
labelDiv label =
    styled Html.span
        [ css "background-color" ("#" ++ label.color)
        , css "color" (contrastColor label.color)
        , cs "m1 center mdl-chip"
        ]
        [ Html.span [ Html.Attributes.class "mdl-chip__text" ] [ Html.text label.name ] ]


aboutPage : Html Message
aboutPage =
    div [ Html.Attributes.class "jumbotron" ]
        [ div [ Html.Attributes.class "container" ]
            [ h1 [] [ Html.text "This is <about> page" ]
            , Html.button [ onClick Messages.GoToMainPage, Html.Attributes.class "btn btn-primary btn-lg" ] [ Html.text "Go To Main Page" ]
            ]
        ]


notFoundView : Html msg
notFoundView =
    div []
        [ Html.text "Not found"
        ]
