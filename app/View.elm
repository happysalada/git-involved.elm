module View exposing (view)

import Html exposing (Html, button, div, h1, span, text)
import Html.Attributes exposing (class, style, id, attribute)
import Html.Events exposing (keyCode)
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
import Element exposing (root, text, html, column, nav, row, el, header, section, Element)
import Element.Attributes exposing (verticalCenter, height, width, fill, px, spacing, center, justify, padding, paddingXY, percent, clip, maxHeight, maxWidth, inlineStyle, spacingXY)
import Style exposing (style, StyleSheet, paddingHint, hover)
import Style.Border as Border
import Style.Shadow as Shadow
import Style.Color as Color
import Style.Font as Font exposing (typeface, lineHeight, size)
import Style.Transition as Transition exposing (all)


type Styles
    = None
    | MainPage
    | Nav
    | Logo
    | Hero
    | Title
    | Subtitle
    | IssueSection
    | QuerySection
    | Card
    | Issue
    | IssueTitle
    | IssueBody
    | IssueDetails
    | RepoDetails
    | Label


gitbackColors =
    { indigo = Color.rgba 63 81 181 1
    , darkIndigo = Color.rgba 0 41 132 1
    , lightGrey = Color.rgba 245 245 245 1
    }


stylesheet : StyleSheet Styles variation
stylesheet =
    Style.stylesheet
        [ Style.style None []
        , Style.style MainPage
            [ Color.text Color.darkCharcoal
            , Font.typeface [ "helvetica", "arial", "sans-serif" ]
            , Font.size 16
            , Font.lineHeight 1.3
            ]
        , Style.style Nav
            [ paddingHint 10
            , Font.typeface [ "helvetica", "arial", "sans-serif" ]
            , Color.background gitbackColors.darkIndigo
            ]
        , Style.style Logo
            [ Font.size 20
            , Color.text Color.white
            ]
        , Style.style Hero
            [ Font.center
            , Font.typeface [ "helvetica", "arial", "sans-serif" ]
            , Color.background gitbackColors.indigo
            , Color.text Color.white
            ]
        , Style.style Title
            [ Font.size 40
            ]
        , Style.style Subtitle
            []
        , Style.style IssueSection
            [ Color.text Color.darkCharcoal
            , Color.background Color.lightGrey
            , Color.border Color.lightGrey
            ]
        , Style.style QuerySection
            [ Color.text Color.darkCharcoal
            , Color.background Color.white
            , Shadow.glow Color.grey 2
            , Border.rounded 2
            ]
        , Style.style Card
            [ Transition.all
            , Color.background Color.white
            , Shadow.glow Color.grey 2
            , Border.rounded 2
            , hover
                [ Shadow.simple ]
            ]
        , Style.style Issue []
        , Style.style IssueTitle
            [ Font.size 24
            ]
        , Style.style IssueBody
            [ Color.text Color.charcoal ]
        , Style.style IssueDetails
            [ Color.text Color.lightCharcoal ]
        , Style.style RepoDetails
            [ paddingHint 16
            ]
        , Style.style Label
            [ Font.center
            , Border.rounded 24
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
    Element.root stylesheet <|
        column MainPage
            []
            [ nav <|
                row Nav
                    []
                    [ el Logo [] (Element.text "Git Back") ]
            , header <|
                column Hero
                    [ verticalCenter, height (px 200), spacingXY 0 16 ]
                    [ el Title [] (Element.text "Contribute to open source")
                    , el Subtitle [] (Element.text "Help out on unassigned open issues")
                    ]
            , section <|
                column IssueSection
                    [ center, width (fill 1) ]
                    [ el None
                        [ padding 16 ]
                        (row QuerySection
                            [ justify, paddingXY 16 8 ]
                            [ Element.html (autoComplete model)
                            , row None
                                [ verticalCenter, paddingXY 32 0 ]
                                [ el None [] (Element.text "Order by:")
                                , el None [] (Element.text (toString model.orderIssuesBy))
                                , Element.html (mdlMenu model.mdl)
                                ]
                            ]
                        )
                    , column None
                        [ spacing 24 ]
                        (maybeIssueSearchResult model)
                    ]
            ]


maybeIssueSearchResult : Model -> List (Element Styles variation msg)
maybeIssueSearchResult model =
    case model.issues of
        RemoteData.NotAsked ->
            [ el None [] (Element.text "") ]

        RemoteData.Loading ->
            (List.map issueDiv defaultIssues)

        RemoteData.Success issues ->
            (List.map issueDiv issues)

        RemoteData.Failure error ->
            [ el None [] (Element.text (toString error)) ]


issueDiv : Models.Issue -> Element Styles variation msg
issueDiv issue =
    row Card
        [ maxWidth (px 800) ]
        [ column Issue
            [ width (percent 80), spacing 16, padding 24 ]
            [ el IssueTitle
                []
                (Element.text issue.title)
            , el IssueBody
                [ maxHeight (px (16 * 8)), clip ]
                (if String.isEmpty issue.body then
                    Element.text "No description"
                 else
                    Element.text issue.body
                )
            , row IssueDetails
                [ spacing 8 ]
                ((issueCardAction issue)
                    :: (List.map labelDiv issue.labels)
                )
            ]
        , el RepoDetails [ width (percent 20) ] (Element.text (repoNameFromUrl issue.repository_url))
        ]


issueCardAction : Models.Issue -> Element Styles variation msg
issueCardAction issue =
    el None
        [ verticalCenter ]
        (Element.text ("opened this issue on " ++ dateFrom issue.createdAt ++ " - " ++ toString issue.commentCount ++ " comments"))


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


labelDiv : Models.Label -> Element Styles variation msg
labelDiv label =
    el Label
        [ paddingXY 12 8
        , inlineStyle
            [ ( "backgroundColor", "#" ++ label.color )
            , ( "color", contrastColor label.color )
            ]
        ]
        (Element.text label.name)


aboutPage : Html Message
aboutPage =
    div [ Html.Attributes.class "jumbotron" ]
        [ div [ Html.Attributes.class "container" ]
            [ h1 [] [ Html.text "This is <about> page" ]
            , Html.button [ Html.Attributes.class "btn btn-primary btn-lg" ] [ Html.text "Go To Main Page" ]
            ]
        ]


notFoundView : Html msg
notFoundView =
    div []
        [ Html.text "Not found"
        ]
