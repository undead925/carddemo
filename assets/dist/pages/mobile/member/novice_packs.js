define(function(require){var A=require("jquery"),g=require("layer.m/1.6/layer.m"),w=require("../common"),Q=A("#is_old_data");A(function(){A("#header h1").text("新手大礼包");A("#header a").eq(0).attr("href","/phone/account/").html('<i class="qtydfont">&#xe623;</i>返回');A("#j-concern-wx").click(function(){g.open({content:'<div class="tac"><img style="width:100%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAFACAMAAAD6TlWYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAYBQTFRF5OTkd3d3Ojk5tLS0wsLCZWVkvLy8oqGh5JaY7Ozs3NzcmgID+/v6FxcX8fHxQkFBlZWV/f39Tk5OBgYGJiYmiYmJW1tbzc3NgYGAU1NTomBi9/f3qqqqm5ubzmRmyMjI0NDQ19fX983J/f35+v/+/uXk8rm43X1+t5SVXh8l/f/+tn+C//779/7+//3+/vv1fkVH/vn++fTs1bOy/fj4bGtr/vby+f76/fP5/Pz+/P/7/vv7k4uJ+fv+09HNX19fKyoqrKimnZSTJhET9/74+treoKCgU0tI2dnZtbW19fLwVlFOX1tWuLi4xsXFpaSkkZGRMjIyZFBOKSEd8f36hoaFra2t0c7MsLCw/u7w4eHh6Ofn1NTUrh0imJiYLi4uk5mSKAMB9fL04e/pHBwc5tfU0c7S5+3k5ubmzNHRt7e37+/unqSfw05OozE1sUVG6urqr7a3Dw8P8/PzjY2NTllRp6enTEhFR0dHWFhYWFxZ9fX0Hx8f/v7+AAAA////+lf/kgAAM9lJREFUeNrsnYtDG8fV6CUhCSOvJFYSSEQQoZjYrYJJ89Dnrkk+SNpQaIpASUWpwNB7r3qvL7pxuYKLxYdG86/fee3uzOzsaPUA26mOndYr7WP2pzOvc86cCcGpjCWhKYIpwCnAKcApwKlMAU4BTgFOAU5lCnAKcApwCnAqU4BTgFOAU4CTEvAevjS4X4AA4L9DFwqQ6zzXAuB843MV8PxTeln1tcDnAval6XwFTGii/zgxTRPcK0Bgmax8wwl+XVO4FhWWvqXP+ehNgOKxHoCKaxEFjSohQogaPRU9xBQAAvwVHP7tggMEo9YMxS9LdXKwqgDT57EaSub72QaCURsJZeXHWmXqar7in+oTVM97L9tAC8KFzNKwktlDSoR0IiFcmilA2gKFVXfMHEBoAfex8+SkTFiobjCvvPT2UqeB5Qx/UaYhfjszwustDAUw0h9eGvR1a+Kn56xe95TXVF01wpQz9NOWWKBl9fMSOoBx8dyI+G1jhNeLDFOF4dIIT5inV+fFT7usxqh/koJYn2LKss4oL+00dVVR+hkz4rfzI7ze0nsJMDwFGAAgnGrgFOC7B5jz7US4x7JOJCeON3w6kaJudPGeAEx2u+lB0k1ngwCsRhTXRlZEgAv0pK04kb1L+l0tonzucVwhM6EhAGbTAV6vmxwDYDfIUNLoBAE4jKyya4+0Q+WOUlHOhgDYKQYpTfe+AbYnDtC+xYwOoJFUAlwZBmD7vgGmgzzg9cQBloIATLWUAHeGAfg6SGnSU4AfEkDgN5CeOMCr3kMABA8MEHg0ME1nu+Zgi4r7L/sW+7xNcLg2MKodg/AA/X8jMCmAwAwMEE3vS545uMWb+kzZ8Am89sBVCaCJjaKe3yCp64V5gFkdQF8zJLUiTUgDlYO4+rxCAwFIxeNRVy5WAS1ijNyiXqClLS7RwzPXgoiNiY06GR0usovZNWFqFQQxsRTHUa/E4yF6uzYtRSliD2jJjSO7XoDoxvN11Ri1yiyjkwC4rfyxYwoN9DGvOzORt/SjYtaZiZguQHkmknZndgqLmBHEWpoRr6mpANozSEm2J9gGpkk9UJhSPABJZRO8JIAapCO0Lm0xgDlnLmxy9kB3LgwYzyztAYgSR+S5MHFtQJXnAuuVhc2FXacWE8krAYaVANMT1MC0ny3KW4VNwV1D3EZEKdjbKwBydlxfgORH8AA0DK+/yvaWsIOuWGQFQPN9Aqhya4rWGC9AR2m81piMOwYBUAHQf4DkkBwPIHxwgP4eGzXAsGhM8AcIVVUYQDDIhTgQIATvE0DNqCri9BpEspxPBDg6I/lE6iJPsRSdQL65pQ8LIB6ytA9mb25uDlaaHoAYWvrohkhs8RZJ5gYCFiVgYu/cWQZ/umR75RpLt7eLt1vVg5uDm5vlZdGkmD0jt1pZFXW+tnLjyvJRfUyA8GEB4s7SnkTdKDXQlrZ3IO1RJaD2sKlL4TNu6X9YADEDex52rAOYbUIFNh+Ae1omBfGixckCfPA2ECoBenqAbMKd5Yr9iCLKZGYYgFv/XgCdeqyMzmJBNQMBgl8pQGF06wHID37xYAzPWCxhSIzmEmSqMRgg96BfD8C4eFOpOwx5w5JUMXvEHnL8DttA+C410HAFgEg/6wrWQO7bokFIAWBdcZ8adxbtY5AGZn2lXwCWe4kJtqRzP1yArXout+38yR0nypycpvkve5ErRBDNhcOtbe6SXhxHUZogtXpa9pVEgbsRuuiMf85uM/3hVmFJVnU+yWyKTkqlecMR+XBAFKX09jfaYeEHDLAmPOJOnFX0roTQjr7rExnsUSgofSIf7Fw4IMBiUICDCYanAMcDONVAf4B7QZyCEsDZ9xKgOrRqaxiAZR3AnHoQl9c7bJVVeHkEc5Z68J2bIMD5WNgrsZkgAHMFenZjAUt4Rgmw0zgkX9NzC7YixuYXvOLc4rDQcK9xpMCfez2fCwJwRvl68+/Cse4FuCQqcVcJUKp/Ie1sgkUZtLnYdk5uh52JvF+RCQMjVBe1AFfE0I6+zptqx8aMO5X7wABu3TfArckChFOAU4D3CDB03wADBfcVkzqAadGctaiNDGKj4NMhAfKL+4bpRJKBQnzfjqOB7cvXAyTUPu3QyAkJYLKXbCWTyaXLk9eh1yeXXXSEjmNzJ+iik1A9iY9yTHmz7OT5OXzLy3gSf9vqZWlQRraHvmu1WllfgKYJjVAT3/gyhm/U6tk/UDKHb+UcShpYbg96u9BlexwNzCY7AyXZUS9zuLHaSO6O2WnxO3K4k6UXreLDlMmmEa3LIj68i9FvI6kUPjTYNKJr4MOrq7pvFUYzvkSHXrtCnmPZnrxjUgrzRgmw3xn8fslk9h2tE4mLgXqs6PabnNDDazaVg8JU7lycRmTEZlQNsMxufCCGGNZEz6gE8L1eaEN9InCfxUbV6GLYHd4n4kxkeylqUPUGF/Xt6CxLAxCgbxNZuxklj42ymKx9+tjjBwUIJwSQyD62x1OAOJhqR/TKuQChYXhiY97SxjXDIltFgHaMNGsDXYCC4u9T/XxQgGB0DQRKgESi9MY+AK9oT6qJzgIagPhSCWDNAQgeGiAA41Rh4AeQNUZqgK2i0AZ6AZL4wLoSIJsLN9UALyBxmk4AYCYwQBOMvGIdcLExBx6A+MaHonWrIJqzwuLY8ZZrAxHAlvAmNkDWchQ7AsC441YhbvsD8WccZcV6OnAVxuFSe435YaWxSi+9PDxER4cLCS9A9O0pufH1fFsA2KkSCZ+zwRs77LkRqhaicLNAnhMXO5FIGJ0aC2+JGhi6xqWYX2jS8K/EAinU4SXro0d4vb0h2sDR054Ajw9NrMKm3pzsX3m8hdKuVAJCiwTuMT1KSNmHjAQQAFWEKgdQkRUlKEBFofRLvbgVAuBes0+FBiwT8GgYkJWBhrH4XucCVJ1TGL35HqCBwJ0iA//kM+pUNarXDA5Qq2OALJsRolhwHiWThbYonnjBA4QTAQgcgFlfgCZwliDRImtD0cXPyEINGS6YEEAyJZBuDQBNUzVQA715qApKCIMAkjsIALNyFUYnWGzFismAqBsdr5gk7xYNnh2YOmsogIM0Wvkr2yOw0yBe8aFGYNkgbWDQso/cDwQHiH7HuVoeSSkvmtEM9AmS2iVQZRKKbp/XsSyv5l0p5dk6rflcnZNIMghAWorVWlq49FwcxlyVStwDawnl722tlvJeqc3R1VUp4UvlLYatwgdKbQqxoh9qmxlpaL7L9MISzq4GAWhnjDhRlkKaC/f9LcPASVbg8Q0CvGQgPuJMRCOzwwP0C7DcVVasYQD250THwiQBCpMZJm8nAJAZ87JlnU/ER3Qx0o7EggBcYbMXLvEONqiq58Ja9Wmrm4wb+stGxzFnTQFOAQYZiz80wGXl278O1AZKncgwAKUGjFnEOifCsMMGeKD0jKoB3qkBHkwcIBBnFVmx+Q6pg1QkOdcFa+kBSoakIwawqATIzJDlwZ2I71ByZfIaGO5mkNzaPWn3Fh92WW0pHi8fI7mRlKpArnFk5ejYlaPjO9YokJPebhWVAAsX5OR54UZ2KbLdJVKKGxFgnZTtNi3e4jCjkKWlm2OF3DSVHflYAHM6D3ewOqtWOXvcklICzCvfRJKqCFAd2+6zXlH7ApMEqI1Q9ZGMLkLVlkaQEN+ZQYZwDUDJqSSKPjbmgwBYGB9ggbbSU4BTgOMCBGMAhKMBDN0PQG+O+q4GIOCv4wyXaQ9AxXJCuxNp+wMEfilARYBX6m+PdQCTWmPX6siOdQQif7zvyEU8XqcWy1ami+RttyMALO7PXFzsXxw3qS2yvbdHLqvic7uZCKeBJgDN4wv03cwFG8bMRvBJ6ds7wbHOr1TCjtI0udVb9tgeKYUjBVrK5bddhaRL9DewAUbItRk2KO0sx9HrXRzvUoBXezP7nKzQW2SGTgGqyFcjrmuwB8WsCjfZtwv02pK4yKPGAUTfzgujGiCpvQqgKQ+MqspWIOlrx+QBJkSzkqjEkspFRowP5MN6JLGjI7fFhTbcVA7w+TuFERirwivqqRzQdCIAKqOzJIAt098TBmS7+Jl3JOSdvUTE9msIgN5lk8zncAtJEJUlAgy5AZYm+laKzrrgq7Bp//ZsOo33SuH9KepOhG0ewgHkHRUFWrxc0W/PEjE2hnw0rwaYlWeQJCBinABLSW7pt0bOd6kX3ntBjI25EDVQAEidUbaTSl2FbackUGog4AFq7OH62JgFP4Bj587yAsQl8geoiM4SAEIJIJD2LvEAdHy3wFOF7drN/FIyQHGjoREBwgkDXKK/qdETWvOQmIj71ImLEkZTNXrjFcGkP8AaE3c93ZjCudiVQWV8ktj22TIjAjxUAjxVtIGTBZih1dBoKQGy5Ju73BBWBIiHgWdan4gPQJYYalvsytzpdFYBUEyjYgMs0cPrIADrEwR4lo/WorV4mXr5QSlKDqnZBxi1KPkTjmBJ2zav7TQ5PHdCfElPcBnH10ZrrMKt1CO8HJbwjfIrwi3qVZbpdDVOHss68KsMfR4L4cpG0tyN6rinsVCTUaUPiJEbR6NXtLUNxfFRKZ4UABaj0Zr7J77Kon0mAbDMj6l8EgT6WEP5mYjXv69ebt701CVFiFVKG9KQYz1IXTKoAqHILQGgT7jUJABGoZMMR5WSmH5QHQjQy7AQZKVShr6yNBH0ySPNQecGcRllVFE76Q8QOEODyQCEvnn6TLsrrQbRQOkmEsAzCWCWAyhfOgZAO+yIAMw+DEBNumpUHBw/GkgDhQy1dBDH58Y5owUviSFDNIOls+OfPrxNBTBLQwz5lNVkR0AMMEsBarbiu2+ATqLeABroMcgM0EA+QlVOmD0EQFkDAeuV2po20G3r7x9goEirmtJqVFCNnOUV62w8ESxCVQ1wUd3v9bWdCIDgIaowvJo9m92ZnV3uDgSI1K88j051ZKewhSV2a68jXMYfLttYu1X87dICjUICx2f4mvmoCLBOTrKlmlMCrC8foOeu7DCH7CkqBT6OoSsWt7YKK7Nemd9jJqJ7B9gMtEoAA7SAPIlihiRLHeVT4qqT5WQyXxIBzitNtBLAvnqZg6WrO9sP1Ik4c+F+kCq8o/QKhNS3uBCrXF2YytkAJX/+lhagOJXrXOoARj4EgCz9ZFN9Cz5zEdCt1hwW4IOlv3sIDZwCfMca2LhXgBOqwnEdwFCgTmRVjBIWO5G5/kCAriuGDUlSHaVzNSYCjCi7JRvg3cA2EI63q1e/0yFpNKPiIKyYKiJpG44G+mfo7GQdJcbXWCvipwXyqZnoiB9zAPH0hTzOMCI0p6etgb0+TQFqF+oKn+TVQCHzqCdrB7lzWHx6lpYmbRjkjuNoYOR1AsluuSh8a6STuV6ul7THIIlywlcubZVrbaNLcq1YE38aSrAhSXIb3ykXOSUnnywqAAIYT/bIWXvk2lPWdQL62NU2i0zItdApue2OCDB0yhWmvGuIFukeeXyvQW78Ompbhi/xYfOYPnV7nJwJGeW39nZQ1SBBDSWFW8UT79WR/OwOQJxC1Q4I9FlqwuwcZfVMRC1qk/5lVnDI5keOTNAn3vE4lfSyr3QtO4l3aJl7KWgapsqpZBnAMSfXdACl0I5RANo+kbFDfAcBtCYI0AntUC2UXyZZfB0NjP5aABoTBhgJF4p02jkTvl5w/4R3ieUO7BYKCwvXjUJoqoEOQMO1hsbiKXsdqKkw1gZdLe0FCMcACCcLEPCmXFcDF4K82JG6E7FfN7cMRxfA7dYn2SO6orvBW6isd0a+Knq0VyeogSvhApLwMs1tb2tger7gL2HmiCqHwwV0Nf2L/mu4Z6C/4ZBtkjXB0EKLerSIb3kdFjWwt7BAnrErEjwjLzLPtgvLhhu4FFXmPp0L0yISaZB/ooNGbgIAc8LkxsgFmXocKJ9nx/rdcWFZV83VESQfjYfw1TVtKY7ExyeDxAeyyKpz8XASaZBvqZXWCgTwWPm8We9anUS+mRpFLnejcRxXeKErxb6ogeKSR2etjgjwdnLGBDVAYwiA2H9j7xJiCamfANv0dXe3OGobaK7uX6FbxIYGmHWMCSQo1O69WLtwS11Nk4jO8gKEQ2qgaW8NCUnyF14D6TfNXSfKyCPrTJQtoGlYEJ7GvTsae2Kk/TXwNXUVSh29q4EE6OQBDqOBbLMa58Y7PED0wVXe0qjYOv6z7ptcA481mhCmIqMCPIFAsRkjB9AE704DL5xOwmlipORjxBKoGR1v4P+toDesVCq+w7841Ob+kABKzviisg18yzkDXYtYd/Ia2Mn1/KV18LqJpHzCDYUFgLTlWU35zhhMcx1U1tbWKhWNMXIuqneoSgDTyRZXxNxqiJQxJfmlOvikVqZJJLTUwoed2OQ1MAzvfLvIK2OJpOQkBh3L9AMINACJYOWraFLgpFZRE7AQGGBq7sou4NVV8aRHyyjNCIqX6MsrI54l32b3DHz6XHHyGljQdpFdPrRKAdC0AfoGhyN26FLUiWxsbAAdwOvAACUd76heBEiGuKj2NcfTQJ1knKaD92vMBgWI+K1VELn19ZeVii8/2M6bATTQJw1MShmdZfcqUU+Y50QAouqotMZ4qpkL0LTsMHJ+GAOMAQDJKOblyxfPX6z5GxRSq2AAQJqWSrXnmhPe1lBCGBUgv8whzepfmg498UDaEAAKAzPgAxAPoAF5D2GZAx7H6QCuP3nyZN00UTfy0nwyDkAykufifp25NAkuyroAhfxPowM03YU2kgYuilPjsGpgpgDoWEXETmQQwBd/fLFubsA1y1rf3KyMCFD79lcaDRyjCnOjb8mzFxOn5GGV7joSkQ1zJr/EpQxBUQ8QWH9co/96/u0XX6xBn2ZsAMCa8OPKd/BZNSn6RGZGAAj2r1ewXMeIVJkPO1fFR1uxQ/LlWSHGy21ctH1e2LfYwtcs7tKQvNPDM/Th/EpqMED095NHzx49+mEdaaH9dpVBAGMHK7yESdkW7YwihUWhzPP4Nc6umbPzJCZ8GyYveTbfHBqg5fQHPrNMlgB1QblgyscrF5eXu4KioQBYweTwwKWyBp/+8pjIL0/h2gs0HKyAAAClcYtUD6Q8J2LjI1lQz9VNU4Be2BV1rgY78Y4EcF5r0q/JRVECRNhQDVh/svkt/PoZZvfxR2/Q/z2Da89fmJvr6Htp5uoBqN4WLeNrTOBEtVJpoDwsQDhQA8FLNH178fm3a9bHiNsnn/4ewqcfE4KWZayTWd0UoAYgGjibaxWwuQYfPX789OlHb958/APE/34EK99a4GVFtsxMAUoAN9fX1sDGBvwBad2jN29e4fr7OXz2+NWnFdQ0v1xXAryeDMDThwLYv1QCVDvpjsXorAEA1zdpNUXIfvnkqx9+/8kzhPDND+YrpIJrZuXl+ro0XCcAC944dai2RUV0ANv3B3A7za1pq0eO8yUk+Yaw0G37RnmLWp2cVb8h1zCplYo+beA67ijW4Of/evxoHf7+s4+++gH1Ja+ePnr8CwKIJiey8ZMA3NmuR2zdKpyWeNmiT4+Rg3x+WwmwGcXfrh6pAZ6Sb6O74wAsKc2SgRzrUPnb93d9AGL7FeqKf3j1+BP4FOndl1gZH3/89PGb/4AVNDuuqABad2gQl9XNRNSZU+wAy6o2wDLiH2j1kADrAQGuVdafvEBN4KsfcDeCPvj648e//P2Tx6/+Dp9voPpdUQDEk8L3G2BUiLUdKjZGrYF4LqwCCDYQwM/XiQb+C49eYO13j599CZEGFisvNzaAbNwnAIvt4uiZi+4hxHcQQOv+ACJEay83N+EXbx4/RRBR3X30GzSOgc/ePPvqzwjvRoU4mT5wgMZ9Alx7/rxikl4Yfoqmcq+e/QCerP/90ce//Aa1f1gDP0iAvE3DXwPBEJ1Ik/nrFADXcC/yCR47QzyIefzml1/ePH712edPXiKAa2sVRRWeM2CiPzzAbIgOK/XLHLpjANyT11zh5aqSBnK5s0wQuBO5pJcqqjD6EM+In5Eu5NNnrzDDV/9C//7aRL3wy+cVbtkqoADvkAaWFXwGAexjgNag1K1vRwcILo9nZmb2ZmZimW7mbSbdoM5wSQMvl7rk22NxTXkhjT50/6zMCHKb6XaXFcYENFR5WQHW5vMrVH+ffQrh358+e/bs46ewsvmFhaovdpS4TioXIEjNHHO3j19rNTAT30NvdbxXJEZK83SZXLMitgLJDCp2N7OUHAOg/Y9zZXSWlDuroa2zUoR4h7kElAA3LPOP8O8fI8375dlnH7959eqzTzf+uGZZay/xPMULsNg2ZN1PaAGGuVfklnBrszCMlj+QVZc0rQ9SdBYrxkmHfjsvtoKe/IFc9Au8y9G5n2Ig/XIdgG+/ff41LH71htoD33wF4ZMXzy1IGkDRxUkBpoqWFDoY1QKs0hQiJOyE+EwIxnJW1QhMDGDWE50lLbUcCJB7v6IvQPhyHS9utcwnFVp9Hz19AuEXGxumhQcxGKC3E0kZhjUsQBajqQU4vgYq/MJQ1kCfTOYKDeSc/z0OoF2HKhuwggM66HgFWGuOVm5+8cVGZQ1R3CBVmNU90waI20BpDOACBGqAwLnC+ceEAKoSm3DxgaY2+ZgOoBA9wWugZQCmP7CytrGJ67CFKKGu5MnLF2trFmoSwRdoAGMhgmtrLP0KqoI4YoQNY4qy57gWAKAsEwPoDUVJK71yMW0nkgnciaAqhHhtbG6galVZMzc2N1+8eAJfQri5/sR4/vxbEz5Z33zxx5eVzQ3w/MVLuI6U1ITrYN1YpwA1I9hj2tpJaxzVgUJz/ckAxD17Hnfse8s1EWA6vkcGCYtkYJJmaXLmlvAopps+VgJMLpHBwFvvMCZtD2OsTf466+svuOgVq2KiCcsTMvv4/KVlfov+H3vZyYeVJxRg+ca57xHzoZ2SoVW3m8c/D84iyg+pMuEZlRzQL5eYuz2Jc6yj/4YdxpCa0RVD5NKe8ad+2MMBzGgG0rYGwnKhEP5u8+g/4dxBomJuRG/iMweH1fD//WsFbAL43Q2Ef2v+85P1ivEt/HL2NQjd3MG/JSA2rnoMqmcBWiR4ptSxFvs2RgGOPpA2/SITbEkE6XgyOlswmcoBBnAd1v70YyYc69djb/t/wT1AN3f+h2zkx//6P0WItLNThcfJf372EdJOOPfj+efo1wjDP+X+BgGrwg1/kz5U7nmn3pzU3iZ6ccypHPANLpJ8InbAgToEVwsQR2fZjnVUPUtLsfD+P35Of/TZH8LY8vz1yX98X/8cPmkXN9bhd8noyna2+rvffr+GWc2eHH2f679N565xZfZzKgF70zNlbJYaYI4thuVCfLmXH2mDZh+ApyJAAKAWIABqgIajgYlwsv8P+NO/Hn18/hX8K+LUbC5EPoVXiSvcN9b/XO38nP7pT2GkjaeR78Pbf/k+3K9ukghqH4Ak1Ml/Zu4D0JIBElPtZGKks6IG8l01nk0qVhFx4W0AaM1ZJtyNx85j7d/964eP/lsc/hX+z+r5z52fz+vnhSKE3/cjd/BPf/q+ukFGfpHDL2v/eQkvImm85bM/QJylxi8bVnANnBRA6e2bQ7SBaT8NdAGibuLH2E/hz3/320ePfvsZhH/93/FS6b+y4cJsG/W2qbP6HIxUGxE8YNww92f/8vPPrWQ1Gl7BW8l62sCVIGXTa+CSGA6SHtqkPyRAMC5AE+7FEMD/9eNHjz7+7W/gxnN8+f/r/w076dBQ7/j8v6//4Ztv6gbSqQ2Y+Ln+zXffNbbP29Cye+FJATTuC6BJPXundkGpO3P7mhkTImIeT+b8XCF+zOgp3ahSr4HH1Vgsco7aud9mq5uE93zrp5//jHuJdXhwXrzMfvf9z228j317Cz01hmYS4dgd3GAAQ9Ga7caMsvFRvq4oVL1eDqCBYJe8bf6gTl6sPpsf1q3pu9x1XzmeDw0IbQQD2kBgwf3YT9/sN6rh63/85RuALQbf9L+H9STtrA7ON6P9f9ZQ14VapLkmbhVx1vRyG9hz4eAhAbUAGiiHppWGdqz7Lri+UVrVTjpBFhtqAFbg7I+RBvwfdfR6MTTfThQi2W/QDCfd+XEWnbPS+nM4jSbg51HUh5zU5tP9g+/66ZXVE+AYVOeK8nonnzWc+SBt4LgRqsMCfD0mQCTL38dW4NF/zUH43W0bHm3/hNo/NJiZrWfQRzNLJ9+h+pM/x6sRCq36EuKcX4z0Fpxe+K5dlL0JIwE0PlSA1hP45Zebv0fDrk1YKW4U8ZoWg1TlogFQy4dONNfxPAQni7mjB8VywumFJwXww9JA6AJ8gVl9DeAXJqCc4JMnpmXhQdgGHvtZaEDGWlNibjDsVRMfmgaeqT0L6rKqw0GkZX6kDQSb6+aLFybY+Hat8sSwEC5z/QlSL6R5ZIkJMA28IhUP2A1gGYZp4BkuXbvgAAzWibDXXVF7OUWAqyL0SQAsiSHahTMSxz3PItGlvQurJNr72g43a8jh3WeHeRvgBtIzvK4L+zzcUH/yDzIjIzZ3SpBNHE2SDhM4jnU83iYR49dsoLK7uBXziBMe34gpZDHMnhxn4fHsDuxofwIAJVkQQ7XV7um6eqTt45Wzp2GBxQFY1oZ5SvUgFsSBIS13Td8bwCTb06yq9e+LYvR8nUrDiSe0YydIjJg+69c9TOX0ANtQkwpevU65+M4BatT8dtzYmIcAmJsCnAIcGiCQ/sUAttQ7SvW9C66lKnw9FkB6VzsyQQIoFJV7fiRIYN7W/QBE44fiHF4s305ZIsATK5W6ujOqZIW8JLjttUw1wALO/DIGQDzOubKjsySARhuv00/NGXTbAVRyvIr/ztHAO3yslOK9aSCAR51Wq9dKtnaFKpxt5fDHrcPXTa/svjZVwxJShfEw5jQ1hgKiv21sscEJDZpiFS4lSZmScWrd38N5JFq5XtZJl9HyTZeR69xbG7gjrvmQ1omc+b2pImyQAMTGgURzVIA05KCJr7+b87SBcWfZCDltuT+8TLwKs7lw1n+lkkLVgGmqcm4QgGmkfam8MXoPYkKDOObbaCAtAayx0KoLEj3kDbDURXFk700Db9RLvbLK6Cw70MCAfgDJLDOxOzI9PGPDLuriyZ0HIBedhcNqj/vDEHxogNpJFL+NFZAAxogBffTkY8XdXYxx7lILEHIb8w1Zhe3YvncJUD3JZSlA8euZidVme6T8d818AodspxLtogtwVo7OInI8ahs4cYAk8WNR7FMkf5gZhGDWtnnhoUhzNZ8fPgPjKXa7ozsmQtiaZe+qtyyGjOmDzLVyLg6+IxPSQPTm2eoCzo15zYJGOoUFPqnnoe8Yn4R9VVkyUJIKdHEW2F3N0ClAWdK//PzlXMowwFwh3CB3JfdfiKmj9KuH+BycApS8SOGaZARlOpZEL0Lv0SiwW4VpRlD875vJW6SlmBw2E0n6N/vA3dWSpQA1QmNO5WayGThXNNyx+q12nQjbEuhILOqClCTh3gyqaoDJtmDOqmufx6cABdZdO1QOta2RO5F4DI8mr5ACOq3DlhagYjsM15KZMx/YJ+ICBNy+cnVtE8gDNA3jqh3aXd2d213AqbYXFuj/FM6aeHeA5uvZAvlMKdeNcCFN57VFg9sIe2iA7kolwScCHg5gqw2J/6dKQ/nryk007TrMpwA1Tat41z5pnjal1aidWm0/vh9dDZTosQBxBXa2nfQAJKlb1TtcE4CmC9ByVhJgD8KkAQKNBpJFXlXaMtfVYdbQs8M16gcsAxGcCxXz4rB2O5FAvWz5MhIMoEX2fPAFyA+kPQDxluecBrpRXFQDs5PVwB31zEfsRHI6+4nj2JuzB4TFu1Tbjo930ptD6gxOBwOoMub1nXWmQlAKm/awmPMOq7MFZSdih3bsTQoggEfJHt2kRPhTp3ueNKstsrtJlxztnl4pAd6wzVVq5KzTOdQOFq/wKJjAS24Te0i6XD49PS3vLrV6AwQ9r9DkN4BpxsQi3pBvmwfscJ8cXrIoqU4+RA5Z651LhPg70Q1Zeq3opKqwCYx20StWM0k33Jm3yGGJbb9zrKzC9BZGKpdl+/kACxjOplRnEM8wjGif7vZzZGjmIVep1N1d8c4oiBsS7Rhc2QzrLf10iW7vY9RVm//IewExIVsC3d2lDDCpKuxzo5S4RXhZnBL4zETcBHD2rl74LgfiCCweZCwjeVMPlC5K27GwPcRMJBJoKDWOTwSKoR3zYtNxrB3BuWlY+W3RpA2aZ4L4iKUcyMMk3gk2F36vAYanAKcaqASYGeIeIRHgqjoHkxSZIK3Z7ghvH2wAEQigFFZw/lAA00O0o03RnJUQLXE+si0M4myAR2I/FB8fYF3sRHoPAhD7ZOZ3sBzi7Yu3Fm/LtC7VbvHh7aKYs6s4u4JOnd0Jsy2SZ2e5w1t7DWfhlttGObbVUWpgpKq6hZTVLE5LEZsLAvACb8W8s3NNXmRrkb7WsjRduV3eceVgWYomoiVfOhwKoGcwTgCe+WVi42ciLbHynGt/e0kDJQNZRGmeuBZX7GkB2k1oXIwPXFabgsUXkbbziYwCUEq8c6NaK+eIZI3RLzbsK3thaQSWUcZFsejITpPi0WsgFE366gjVhn9oB5xo5qLJAyw8BEBfc5YtCx8uwPD7DhBMNfDhAXLGvJJrVTPdooudCJDa3p6o+RHtLJQVvSiFy7NrlpRFnxXj1MMqgFw+KlL0G7HjOdMCZL/b9sgA0TNP47VoLVraYYvMSiS6G+6z9WfCinVg1KLo3FopTL9cqtXQUa0Wo4dbNfr1IjlKS0bm2Cr+srSXFta03dJb5CPUxBDJ40P7T+mQnpTeI5+WCvSoLkZnpaL4xtHoHLBwaEeUlXyZXnMtrqFr8PePlqp0YV2MLXcfQQOdPAFpXiv9plVN0RpzKs5EpCSY6iifpKn0h6lli8WMJIWR0KU6MmFGDBDcVsZIS0q8zKvSiAA9Uzlg+pqzQllhKqcH6OMVsJTDT7WwEHtDBBhSA9yDgM+JNhRAMFoVBnipEL+fCHFisyxJZGsTKVwNzYWzDCDeZdk1JhCl3Wemepz6yXL2E5GCfHopITFUSRsAFKO27asePQGHaZqWf2wM2bWTJXfiQnzt7QINywPwBmcuoa6lUdtAebmr7akieRzIpslqa4wI0PFGZJ3cWR6Azg7X/I9SCqKBqZYDEP+k/sFFJoCOEroADab02PfiAYixjgFQsV6YyzTlaQ1fi8nHFADtlbrAzy/VuxIs1oEAXvXcKgw0AIWt97zrRABUABS2whu+Cg9pzppTt4HDAgTepc7aTiTFt4EuwAPxN4iLg616kDbwgMspOApArO7dIcxZV2KIb2JUgG6py1qALIdcmzfouACP3Z8xyy15FAGGtQBXxG21RwAIYP54H8tKN4AszVyQk8PkKBMJAjB7EMeXRFkQFQKI23m4kBZu0YjiO0cbJK4YqTg5PF5lw8/4DDq6ON6lumsDPM84tyBjSHKYLojmwV5GeIPCPicXxyGxkRoaIHD5lwJZHsWZSD8QwKIwpyJtIPBkfCuJpfCJRzcFDdR72Oq6+RDfLo4H0Glz40H44egs05tQXQ9QNOaxTkT+DYhPxHTyuJcUjnq2CHsQQI1PJOsBCOBYACFwczoGBUiAqwFeuADl6CwOYIr+BiqAQA2QjqlckiMD7Ptt5AFH3R6X7EVN2/R4kKD2FhdcJAAkGuICBNLGfBJAPCDzAoQMII77Kgk9DZ7jUh1Eo2E9wCwGyA+k+x6DqjIIdsTUT+g1WcBtMIDJoADxWTt+AMnCLQ3AvgwQ/cMy3XDfgRo4CkDTHNUaA8UxnVZ66k4kLhoGEkKNtgFWxQCvLUUVdg0Q2hUld9oyLmqtkvp0UUMHmWPVLd0cI7mwcz2lbzNIFtW/X3J5Bp98FF7K8DJ/RG5h2zsXLvDhXlgEeNMl5y6Sc+1b3Kb5dVoWzJOTljIr5KwbZhQ19paPXTk6EJ9OZWkpSetOZA+XcWZGHbIZ2z/2l6MquXN3IXgVtjyReatih9AP8jt2decygE4OcdGcnOABuhPvbaEuSXnHfWLbMwMr0MAlS0OHtwHgl8NYv2RvfoiiZ8Usoq+zwm+QF6owkOoSm8pdibsUttTLU7r9sWX4CFXXmC79CDf3BTBAbIybv0wyJthugOL7AxAoAPJOpfcDYKo1BfgrBpiR70HeZFb7oEPRH6YHKIbXJMTfwAfguQBQChZpqYNp344PsDY5gAdjA3SikelzLckvpQdYF30iPdGoDRzLAi9BAGaD9MLWcJ1IopbnpMQWtM0Jn0pSY7v8nJ6f15Gcr6wqTtq1R5bbEXxS7pCaPox8idxiThtgWSYnrR6S+0dsP2Z1l3y6XyeSY1PwPC1FRMost1xWFcr2aOdPuU/LtukyR4saHiUyYTihVoySNj5QWpNUVaXJHhChOqtSfNgWWwEfM4jaItZQrhM5DRQuOEmAA0N8vRbpgvIWeoArilsARc4EleSVhVKtlXPdKv0xYmPuHWD4vQJofXgAC0p3/VQDh9FA8GvTQADMoVIgimFdplP0OHc/12N/6KuB3GMTToyFaXoLs+Dph7AJsyz2KXEdQCBYnvw0MDGqBuKbzjTmh5XGKlkBDJuxWBVJbIF8unDE7SpvAVjbwl+Gqx2PBuLHxuljr6v4FrGtVWgSWym51eEhK2uU3MKWxRmaWueySj7eYsPeXVqKcE+pgfmF+UP0mPk7aCo08IKUYjY8BsBgC029dl0+jsfdFMcByI1yt70a6A6+c4LbyDECRf0133dTyiUlwAY3qvFqoPrlRwrtGErm+b3GPJsRiJXUyKk00DZq14WoOl+vnEve9I296yoB2guuQ8o28HZcgOYYAJ1d7uT9RFhzaHEb84kaaLq7hEao7hFbqg0wy0UZiOlPAL2xyXtMgL3vnh6gOmfCrXJy90Aa6KqCtKMNa+XYP4sKDTR5gJwC6jWQbF3jCXgiDiwAhwQ4IQ2EowNUmLO6boAX94q8BtrpDoAXII0LG1CFIRQN10LvPwggUGrgewlQFG7BNdduViUHGOVyFMg5oZa0EqC92GmYNrA7CsBsMtkZJMlOEIAwddJ2JTW3TROEYg3EjWb7En9s2Z3I3RU6mjsxqId1j+QWzXaYBhr8nWy5TIk/kXE5h59zlckKZczbUfrkjq2QTxuoeHnHMzoUwHT7MvR6gLTL7va4GoBvO8lky/6bbOVP8LUJ5lBv9jr4Uzv5ZrbVwmd19mk9LDZxIUIh9n47/J3IX3xuXbRIl5JJ8uXRHH7Q3YEI8CqBn958bYoDaVEDI+1L7jUT7VEAdoPUEqMTRAOldSKXQiX12SD9SBnbfqg8t3MnnBQXq318mLnw7RAvP4kV66FAACNKvzANXpdXKnGRCabdSAK/ubAdHyFqIJc/EHhWKjnDAaBrAye35J8PhFLI60EA8QhPDZD0sib0A7hnb01IUzsxF3sggHbaIXXuLGnU69XAbN/e2ZDME8fVQFO19Z4zLBkIECevYgCzLkA2VCa38QXo5HSiSyx8AWYxQL5kNRrQ5QXoeQk59RMPkIVZjQ1Qb5x5PXoVhmwZjH8VBt7HqzUw51uF9RrIxUjb6e8mXoVHAxgRx3TSgOyOHwP7AVwWlxmpzVm2l0rt0DgSAV4q32BBnIJnlC6SsTqR+VjYK7EZLcDlMMnzV6AnF1osTOqMpv9jt9jD0VfeJf/XOG9go1CmM7VT+vQq8wjlww0uj+AZm2skwwWhdOTLRiFBfwEbYKyheJFGRLxFAV2IL6bfVssTAJjTLdjwAShZl1kLaK/QyDo+XstbhdNirOKNdiZyqFdI2oQNlYT2WIxsnJkAQLWFLBwE4L4Suk/inb4yllE/Fy5ow/IhHD6L741o0o//uwIEYwAEHwrA8PgAw//WAKca6AEI9ABvxW6JaWBCOySp+QSZg4AAvS5KvRyJnUj+gQEWT1fL5fKpvVWNDbBXz+W2c7lYAn1ZTpR7ggaG0DfoW/onl8uUeQnZI+ejJvfpallMgJrNneOrzzsiwOYqucWZZHmoO0/D1zDjZHab3CJ3RsoYsjv/gxA+zIceqgrnSf5OxVIvA4m5Q7N7ZiXHulE0XAGlvpjW0x4FCZ91mgJANBPB97dXStgAu33hFo4v2eKeZzej2wa5BVjsKx477ib1wQGWnGmEAJAF+h8ECe1YDVTTEkLeGNsVGhMBqheGVJXN6LbaFcrk7QNqID8c1a8XDg8cfPuKlHjHngt7NNAHIBhoD5yET+TeARbeK4DWewAQDA0QjAkwPBpAlTXmPdBA4AuwpAwvLfDBrUAO8NIDDAkNWM9SAlSXPKYG+O41ENtOauKMUkrCLq2UuOb842bAnAk2QEN4+47HM0rupl7ed4ttGO4P1nhvNBBbjecOZm9ubg52miLAbuwWyWL4AH15c3TAhl518ulSrEjjP86WyEnVG4UsL4s2oezSFjm5QO54sLKIj25jPQ4g+jnjK+R59nxv4QgfrtSIiR3excjzYudKDdw+WsaPPTp/4Cqsn4ksqZ10KcivrugFcpJzQWHQkwAu4vhbhFb1kneFwDnJqK32ymUeEqDpiVLZF9djSHNh26FxRe12MeVcmMZp6FIQAs+Ca1aFTbYcWzLpm3QDjXZSWCbi9cqRx6YfFqBpLyNXaGCWAOSjs/jcWaYUneXx/fgCtAw/gHTduSU5laBhkcfJAI13DxBC2Ymlt8bYE+UrIT4wog4f0mgg8AcobMzn+oXx/7STwlolhV94UhvzjWHOuggKUJyHiZHXFIQGIPQBaEe+qbxyCGBL1wZOcmvIbd1oSg8wrx7CdnQA054CkbrU0wWFpbTmrJrSNCV1Iudir7HN+przoVcqeQFWI2mv1Oe1AFcvokhKh24rg//vbQl/Go0vkTt2c/RTCeB2lJf9VUgd7DGxFFl6bYze8ThN75gUemG4uh+No1I0lBqYytBr2C/Ti9bi+Fb0bSNVEv1vv3y98NB+YX2ceogL1Mv6ZS5ynXTetI9UId16mwxkjclLzarSqH3Ea/6gJR/3B7AbBGBDWYW9oY1cdLATFKZeLxzTTuXyCpO2JgUofqY5CYBAt7GHPjpLLd7cWcAfYAaqQjx8VqzrjQl576sCZQJG9sTBK47uPbwtKECSk9MXIDQ9a0FSveAAs/5LvYAKIBvnBFmwNRDgoE1WKcDsmABTeANCFcAsA4gz8JhCOD7RQLd76gXUQG96J1USWicojMujdW8Rqu0RNFDayyJpDGgDFZUpJeWNKQYxZ50GcS0f0LUTwaLYJwCwOArAslB0uwvd8uuFiW1FAthRhvhuaXvhRBDX8g4EAICJAEx2u+nBf7JBAM5H467sx+nrgsQMOT7q4uFYOn1Njmq2E3Khhg9n8rj9syCIRfDTIjSJFTCiF9wdL6Js/7wtwZwF8uQBNXscGMmkpcKjvxl7HBgnZdwLUX75NH9uZKRx4ATWiWh/e/tXtm1RbIP0phSKAOiQtuf2KYqhFfACpLFz/ExEK+dcUBhLIa4MGXs3ALXZV0ZJvOMjW6OHdkxsxfq/LUBrCnCqgb8WDYyMALChDDLvBwkSs6OzFsSiL4sAW3wn4iddx63CAzwI8gJZQ2fJjAwFcCGzNKxkpFjihnCLjDZUe+6WnJxh2Y52l+ihNPEK00/ntQAP6UlhsX8uBXifTFUcaZ6KLxA8BehUhpEpwCnAKcApwCnAqUwBTgFOAU4BTmUKcApwCnAKcCpTgFOAU4BTgFOZApwCnAKcApzKQPn/AgwAttzeo43R00IAAAAASUVORK5CYII="></div><p>1.保存二维码图片，打开微信-点击扫一扫-选择该图-立即关注“QTYD”</p><p>2.微信公众号搜索“QTYD”立即关注</p>',style:"font-size: 14px; min-width:300px;",shadeClose:false,btn:["好"]})})})});