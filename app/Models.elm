module Models exposing (..)

import Autocomplete
import RemoteData exposing (WebData)
import Material


-- [ "Javascript", "Ruby", "Elm", "Java" ]


initialModel : Route -> Model
initialModel route =
    { issues = RemoteData.Loading
    , route = route
    , autocompleteState = Autocomplete.empty
    , selectedLanguage = Just "Javascript"
    , showLanguageMenu = False
    , languageQuery = "Javascript"
    , orderIssuesBy = LastUpdated
    , mdl = Material.model
    }


type alias Model =
    { issues : WebData (List Issue)
    , route : Route
    , autocompleteState : Autocomplete.State
    , selectedLanguage : Maybe String
    , showLanguageMenu : Bool
    , languageQuery : String
    , orderIssuesBy : OrderIssuesBy
    , mdl : Material.Model
    }


type alias Issue =
    { title : String
    , body : String
    , commentCount : Int
    , repository_url : String
    , labels : List Label
    , id : Int
    , createdAt : String
    , updatedAt : String
    }


type alias Label =
    { name : String
    , color : String
    }


type OrderIssuesBy
    = LastUpdated
    | MostPopular


type Route
    = MainPage
    | AboutPage
    | NotFoundRoute
