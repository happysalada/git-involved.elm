module Messages exposing (Message(..))

import Models exposing (IssueSearchResult, OrderIssuesBy)
import RemoteData exposing (WebData)
import Navigation exposing (Location)
import Material
import AutocompleteLang


type Message
    = OnLocationChange Location
    | GoToAboutPage
    | GoToMainPage
    | OnFetchIssues (WebData IssueSearchResult)
    | Acl AutocompleteLang.Message
    | SetOrderIssuesBy OrderIssuesBy
    | Mdl (Material.Msg Message)
