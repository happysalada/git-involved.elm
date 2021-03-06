module HelpersTests exposing (..)

import Expect exposing (Expectation)
import Test exposing (..)
import Helpers exposing (contrastColor)
import Color


suite : Test
suite =
    describe "The Helpers module"
        [ describe "Helpers.contrastColor"
            [ test "from pink returns black" <|
                \_ ->
                    contrastColor "FF9999"
                        |> Expect.equal "black"
            , test "from green returns black" <|
                \_ ->
                    contrastColor "009800"
                        |> Expect.equal "black"
            , test "from dark blue returns white" <|
                \_ ->
                    contrastColor "3E4B9E"
                        |> Expect.equal "white"
            , test "from purple returns white" <|
                \_ ->
                    contrastColor "5319E7"
                        |> Expect.equal "white"
            , test "from dark gray returns white" <|
                \_ ->
                    contrastColor "444444"
                        |> Expect.equal "white"
            , test "from red returns white" <|
                \_ ->
                    contrastColor "E11D21"
                        |> Expect.equal "white"
            , test "from light purple returns white" <|
                \_ ->
                    contrastColor "CC317C"
                        |> Expect.equal "white"
            , test "from dark red returns white" <|
                \_ ->
                    contrastColor "B60205"
                        |> Expect.equal "white"
            , test "from dark bluish returns white" <|
                \_ ->
                    contrastColor "006B75"
                        |> Expect.equal "white"
            ]
        ]
