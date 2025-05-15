import { newElement, applyStyle, applyAttrib, pad, changeTime, timeToSecond, saveData, loadData } from "./utils.js";

let scoreGained = {
    easy: {
        type: {
            text: "",
            image: ""
        }
    },
    medium: {
        type: {
            text: "",
            image: ""
        }
    },
    hard: {
        type: {
            text: "",
            image: ""
        }
    }
};

const savedData = loadData();
if (savedData) {
    scoreGained = savedData;
}

let currentDifficult = "easy";
let canClick = true;
let time = 0;
let timeInterval;
let currentTime = 0;
const difficulties = ["Easy", "Medium", "Hard"];


function startTimer() {
    timeInterval = setInterval(() => {
        time++;
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const timerElement = document.getElementById("timer");
    if (timerElement) {
        const minutes = Math.floor(time / 60);
        const second = time % 60;
        timerElement.textContent = `${pad(minutes)}:${pad(second)}`;
    }
}



function stopTimer() {
    clearInterval(timeInterval);
}

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
        else if (btn.id == "score") {
            const scoreContainer = document.getElementById("scoreContainer");
            if (!scoreContainer) {
                const scorePage = newElement("div", null, "scoreContainer");

                menu.append(scorePage);
                setTimeout(() => {
                    applyStyle(scorePage,{
                        opacity: "1",
                    })
                }, 400);
                applyStyle(frontPage, {
                    opacity: "0",
                    pointerEvents: "none"
                });

                const heading = newElement("p", "headerText", null, "Score");
                scorePage.appendChild(heading);

                for (let i = 0; i < difficulties.length; i++) {
                    let currentDiff = difficulties[i];

                    const diffHeading = newElement("div", "diffHeading", null);
                    const vl = newElement("div", "vLine", null);
                    const diffText = newElement("p", "diffText", null, difficulties[i]);
                    const vl1 = newElement("div", "vLine", null);

                    diffHeading.appendChild(vl)
                    diffHeading.appendChild(diffText)
                    diffHeading.appendChild(vl1)

                    const scoreBasis = ["Text", "Animal Image"];
                    const detailsContainer = newElement("div", "detailCont", difficulties[i]);

                    const detialNameHolder = newElement("div", "nameHolder");
                    const scoreTimeHolder = newElement("div", "nameHolder");
                    for (let j = 0; j < scoreBasis.length; j++) {
                        const detail = newElement("p", "detail", null, scoreBasis[j]);
                        detialNameHolder.appendChild(detail);
                    }

                    const textScore = scoreGained[currentDiff.toLowerCase()]?.type?.text || "-";
                    const imageScore = scoreGained[currentDiff.toLowerCase()]?.type?.image || "-";

                    const textScoreElement = newElement("p", "detail", null, textScore);
                    const imageScoreElement = newElement("p", "detail", null, imageScore);

                    scoreTimeHolder.appendChild(textScoreElement);
                    scoreTimeHolder.appendChild(imageScoreElement);

                    detailsContainer.appendChild(detialNameHolder);
                    detailsContainer.appendChild(scoreTimeHolder);

                    scorePage.appendChild(diffHeading);
                    scorePage.appendChild(detailsContainer);
                }

                const exitCont = newElement("div", "exitContainer", "exitCont");
                const exitButton = newElement("div", "btn", "exitbtn");

                exitButton.addEventListener("click", ()=>{
                    applyStyle(scorePage, {
                        opacity: "0",
                        pointerEvents: "none",
                        transition: "opacity 0.4s ease"
                    })
                    setTimeout(()=>{
                        applyStyle(frontPage, {
                            opacity: "1",
                            pointerEvents: "all",
                        });
                        scorePage.remove();
                    }, 400);
                })

                exitCont.appendChild(exitButton);
                scorePage.appendChild(exitCont);


                // const EasyDiffHeading = newElement

            }
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
                // element.textContent = "Game Loaded Successfully.";
                setTimeout(() => {
                    element.style.opacity = "0";
                    createGame(currentDifficult);
                    setTimeout(() => {
                        element.remove();
                    }, 0);

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

    console.log(scoreGained);
    time = 0;
    const container = newElement("div", null, "gameContainer", null, {}, {});
    const startingWindow = document.getElementById("startingWindow");

    applyStyle(startingWindow, {
        position: "absolute",
        pointerEvents: "none"
    });

    applyStyle(container, {
        opacity: "1",
        transition: "opacity 0.6s ease"
    })
    document.body.appendChild(container);

    const header = newElement("div", "gameHeader");
    applyStyle(header, {
        width: "100%",
        height: "15%",
    });

    const timer = newElement("p", "headerText", "timer", "00:00");
    applyStyle(timer, {
        color: "white"
    })
    container.appendChild(timer);

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
                }, 300);
            });
        })
        startTimer();
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
        setTimeout(() => {
            unflippedTile.forEach(tile => {
                tile.classList.add("flip");
            });
        }, 600);
    }
    else if (selectedTiles[className].length == 2) {
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
        setTimeout(() => {
            showGameOver();
            stopTimer();
        }, 600);
    }
}

function showGameOver() {

    const DOMtimerElement = document.getElementById("timer");
    const container = document.getElementById("gameContainer");
    applyStyle(container, {
        pointerEvents: "none"
    });

    const gameOverContainer = newElement("div", null, "gameOver", null);
    applyStyle(gameOverContainer, {
        opacity: "1",
        transition: "opacity 0.3s ease"
    })
    document.body.appendChild(gameOverContainer);

    const maintext = newElement("p", "overTitle", null, "Game Completed🥳🥳");
    gameOverContainer.appendChild(maintext);

    const timetext = newElement("p", "timeText", null, `Time: ${DOMtimerElement.textContent}`);
    gameOverContainer.appendChild(maintext);
    gameOverContainer.appendChild(timetext);

    // scoreGained[currentDifficult].type.text = changeTime(time);
    // console.log(scoreGained);

    const buttonContainer = newElement("div", null, "buttonContainer");
    gameOverContainer.appendChild(buttonContainer);

    const retryBtn = newElement("button", "overBtn", "retry", null);
    applyAttrib(retryBtn, {
        textContent: "Rerty"
    });

    retryBtn.addEventListener("click", () => {
        gameOverContainer.remove();
        container.remove();
        createGame(currentDifficult);
    })

    const exitBtn = newElement("button", "overBtn", "exit", null);
    applyAttrib(exitBtn, {
        textContent: "Exit"
    });

    exitBtn.addEventListener("click", () => {
        applyStyle(gameOverContainer, {
            opacity: "1",
            pointerEvents: "none"
        })
        applyStyle(container, {
            opacity: "1",
            pointerEvents: "none"
        })

        setTimeout(() => {
            gameOverContainer.remove();
            container.remove();
            const startWindow = document.getElementById("startingWindow");
            const frontElement = document.getElementById("frontPage");
            applyStyle(startWindow, {
                opacity: "1",
                pointerEvents: "all"
            });
            applyStyle(frontElement, {
                opacity: "1",
                pointerEvents: "all"
            });
        }, 1000)
    })
    currentTime = time;
    buttonContainer.appendChild(retryBtn);
    buttonContainer.appendChild(exitBtn);

    updateScore(time);
}

function updateScore() {
    const oldValue = scoreGained[currentDifficult].type.text;
    const oldScore = oldValue ? timeToSecond(oldValue) : Infinity;

    if (currentTime < oldScore) {
        scoreGained[currentDifficult].type.text = changeTime(currentTime);
    }

    saveData(scoreGained);
}