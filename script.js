import { newElement, applyStyle, applyAttrib } from "./utils.js";

let currentDifficult = "easy";
let canClick = true;

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener("click", () => {
        const menu = document.getElementById("startingWindow");
        const frontPage = document.getElementById("frontPage");
        if (btn.id == "play") {
            applyStyle(menu, {
                opacity: "0",
                pointerEvents: "none"
            });
            applyStyle(frontPage, {
                opacity: "0",
                pointerEvents: "none"
            });

            const startAlert = newElement("p", "headerText", null, "Starting the game...", {})
            applyStyle(startAlert, {
                position: "absolute",
                opacity: "0",
                transition: "opacity 0.6s ease",
                color: "white"
            });
            document.body.appendChild(startAlert)
            setTimeout(() => {
                fadeInOut(startAlert, 5, 500);
            }, 500);


        }
        else if (btn.id == "difficulty") {
            let difficultyContainer = document.getElementById("difficultyPage")

            if (!difficultyContainer) {
                const difficultyPage = newElement("div", null, "difficultyPage", null, {}, {})

                const text = newElement("p", "headerText", null, "Choose Dificulty", {});

                difficultyPage.appendChild(text);

                for (let i = 0; i < 3; i++) {
                    const diffBtn = newElement("button", "btn", null, null, {}, {});
                    if (i == 0) {
                        applyAttrib(diffBtn, {
                            textContent: "Easy",
                            id: "easy",
                            classList: "active"
                        })
                    }
                    else if (i == 1) {
                        applyAttrib(diffBtn, {
                            textContent: "Medium",
                            id: "medium"
                        })
                    }
                    else if (i == 2) {
                        applyAttrib(diffBtn, {
                            textContent: "Hard",
                            id: "hard"
                        })
                    }
                    diffBtn.addEventListener("click", () => {
                        difficultyManager(diffBtn.id);
                    });
                    difficultyPage.appendChild(diffBtn);
                }

                const returnBtn = newElement("div", null, "returnContainer", null, {});

                const button = newElement("button", "btn", "returnbtn", null, {});
                button.addEventListener("click", () => {
                    applyStyle(difficultyPage, {
                        opacity: "0",
                        pointerEvents: "none"
                    })

                    setTimeout(() => {
                        applyStyle(frontPage, {
                            opacity: "1",
                            pointerEvents: "all"
                        })
                    }, 400);
                })
                returnBtn.appendChild(button);
                difficultyPage.appendChild(returnBtn);

                menu.appendChild(difficultyPage);

                setTimeout(() => {
                    difficultyPage.style.opacity = "1";
                }, 400);
                difficultyManager();
            }
            else {
                setTimeout(() => {
                    applyStyle(difficultyContainer, {
                        opacity: "1",
                        pointerEvents: "all"
                    });
                }, 400);
            }

            const frontPage = document.getElementById("frontPage");
            applyStyle(frontPage, {
                opacity: "0",
                pointerEvents: "none"
            });
        }
    })
})

function difficultyManager(id) {
    const difficultyLevel = ["easy", "medium", "hard"]
    if (difficultyLevel.includes(id)) {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.classList.remove("active");
        })

        const selectedBtn = document.getElementById(id);
        if (selectedBtn) {
            selectedBtn.classList.add("active");
            currentDifficult = selectedBtn.id;
            console.log(currentDifficult);
        }
    }
}

function fadeInOut(element, times, interval,) {
    let count = 0;

    function toggle() {
        if (count >= times) return;

        element.style.opacity = "1";
        setTimeout(() => {
            if (count == (times - 1)) {
                element.textContent = "Game Loaded Successfully.";
                setTimeout(() => {
                    element.style.opacity = "0";
                    createGame(currentDifficult);
                    setTimeout(() => {
                        element.remove();
                    }, 200);

                }, interval + interval);
                return;
            }
            element.style.opacity = "0";
            count++;
            setTimeout(toggle, interval);
        }, interval);
    }
    toggle();
}

function createGame(difficulty) {
    console.log("create game function called");
    const container = newElement("div", null, "gameContainer", null, {}, {});
    const startingWindow = document.getElementById("startingWindow");

    applyStyle(startingWindow, { position: "absolute",
pointerEvents: "none" });
    document.body.appendChild(container);

    const header = newElement("div", "gameHeader");
    applyStyle(header, {
        width: "100%",
        height: "15%",
    });

    const text = newElement("p", "headerText", null, "Match The Similar Picture.", {}, {});
    applyStyle(text, {
        width: "100%",
        height: "100%",
        textAlign: "center",
        color: "white"
    })
    header.appendChild(text);

    const exitCont = newElement("div", null, "exitContainer", null);
    const exitbtn = newElement("button", "btn", "exitbtn");
    exitCont.addEventListener("click", () => {
        container.style.opacity = "0";
        applyStyle(container, {
            opacity: "0",
            pointerEvents: "none"
        })
        setTimeout(() => {
            container.remove();
            applyStyle(startingWindow, {
                opacity: "",
                pointerEvents: "all"
            })
            applyStyle(frontPage, {
                opacity: "1",
                pointerEvents: "all"
            })
        }, 400);
    })

    exitCont.appendChild(exitbtn);
    header.appendChild(exitCont);
    container.appendChild(header);

    const mainGame = newElement("div", "game", "game");
    applyStyle(mainGame, {
        width: "100%",
        height: "85%"
    })
    container.appendChild(mainGame);

    let noOfTiles = {
        "easy": 6,
        "medium": 12,
        "hard": 24,
    }

    if (difficulty in noOfTiles) {
        applyAttrib(container, {
            classList: difficulty
        })
        for (let i = 0; i < noOfTiles[difficulty]; i++) {
            const tile = newElement("div", "tile", null, null, {}, {});
            mainGame.appendChild(tile);
        }
    }
    setTimeout(() => {
        arrangeCards(difficulty);
    }, 500);
}

function arrangeCards(difficulty) {

    let availableName;
    if (difficulty == "easy") {
        availableName = {
            "red": 2,
            "blue": 2,
            "green": 2
        };
    }
    else if (difficulty == "medium") {
        availableName = {
            "red": 2,
            "blue": 2,
            "green": 2,
            "yellow": 2,
            "orange": 2,
            "purple": 2
        };
    }
    else if (difficulty == "hard") {
        availableName = {
            "red": 2,
            "blue": 2,
            "green": 2,
            "yellow": 2,
            "orange": 2,
            "purple": 2,
            "black": 2,
            "pink": 2,
            "gold": 2,
            "silver": 2,
            "white": 2,
            "peach": 2
        };
    }

    const keys = Object.keys(availableName);
    let tileNo = 1;
    const tiles = document.querySelectorAll('.tile');

    tiles.forEach(tile => {
        if (tile.hasChildNodes()) return;
        let assigned = false;

        while (!assigned) {
            const randomIndex = Math.floor(Math.random() * keys.length)
            const randomKey = keys[randomIndex];

            if (availableName[randomKey] > 0) {
                const text = newElement("p", "tileText", null, randomKey);
                tile.appendChild(text);
                tile.classList.add(randomKey);
                tile.id = tileNo;
                availableName[randomKey]--;
                tileNo++;
                assigned = true;
            }

            if (Object.values(availableName).every(v => v === 0)) break;
        }
    })
    setTimeout(() => {
        tiles.forEach(tile => {
            tile.classList.add("flip");

            tile.addEventListener("click", (e) => {
                if (!canClick) return;

                canClick = false;
                let clickedTile = e.target;
                tile.classList.remove("flip");

                if (!clickedTile.classList.contains('tile')) {
                    clickedTile = clickedTile.closest('.tile');
                }

                if (clickedTile) {
                    checkTile(tile, clickedTile.classList);
                }

                setTimeout(() => {
                    canClick = true;
                }, 600);
            });
        })
    }, 3000);

}

let selectedTiles = {}

function checkTile(element, clsList) {
    const list = [...clsList];
    const className = list[1];
    const unflippedTile = document.querySelectorAll(".tile:not(.flip):not(.done)");

    if (!selectedTiles[className]) {
        selectedTiles[className] = [];
    }
    selectedTiles[className].push(element.id);


    if (Object.keys(selectedTiles).length == 2) {
        selectedTiles = {};
        console.log("selected tile of different name");
        setTimeout(() => {
            unflippedTile.forEach(tile => {
                tile.classList.add("flip");
            });
        }, 800);
    }
    else if (selectedTiles[className].length == 2) {
        console.log("selected the tile of same name");
        const tile0 = document.getElementById(selectedTiles[className][0]);
        const tile1 = document.getElementById(selectedTiles[className][1]);
        applyStyle(tile0, {
            backgroundColor: "green",
            pointerEvents: "none"
        })
        applyStyle(tile1, {
            backgroundColor: "green",
            pointerEvents: "none"
        })

        tile0.classList.add("done");
        tile1.classList.add("done");

        selectedTiles = {}
        checkGameEnd()
    }
}

function checkGameEnd() {
    let over = true;
    document.querySelectorAll('.tile').forEach(tile => {
        if (!tile.classList.contains('done')) {
            over = false;
        }
    });

    if (over) {
        setTimeout(()=> {
            alert("Game completed");
        }, 600);
    }
}
