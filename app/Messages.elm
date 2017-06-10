module Messages exposing (Message(..))

import Models exposing (Issue, OrderIssuesBy)
import RemoteData exposing (WebData)
import Navigation exposing (Location)
import Material
import Autocomplete


type Message
    = OnLocationChange Location
    | OnFetchIssues (WebData (List Issue))
    | GoToAboutPage
    | GoToMainPage
    | Mdl (Material.Msg Message)
    | SetOrderIssuesBy OrderIssuesBy
    | SetAutoState Autocomplete.Msg
    | SetQuery String
    | PreviewLanguage String
    | SelectLanguageMouse String
    | Reset
    | Wrap Bool
    | SelectLanguageKeyboard String
    | NoOp
    | HandleEscape
