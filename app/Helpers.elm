module Helpers exposing (contrastColor, toRgb)

import Hex exposing (fromString)
import Regex exposing (find, regex)
import Color


toRgb : String -> List Int
toRgb color =
    find Regex.All (regex "\\w\\w") color
        |> List.map (\color -> color.match)
        |> List.map fromString
        |> List.map (Result.withDefault 0)


luminosity : String -> Float
luminosity color =
    toRgb color
        |> List.map toFloat
        |> List.map (\n -> n / 255)
        |> List.map (\n -> n ^ 2.2)
        |> List.map2 (*) [ 0.2126, 0.7152, 0.0722 ]
        |> List.sum


contrastColor : String -> String
contrastColor color =
    let
        luminosityDifference =
            (luminosity color + 0.05) / 0.05
    in
        if luminosityDifference >= 5 then
            "black"
        else
            "white"



-- if (rgbValue >= 384) then
--     "white"
-- else
--     "black"
