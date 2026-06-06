//===================== ZMIENNE =====================//
const main = document.querySelector("main");

//PYTANIA - na razie gówno wpisałam cokowleik do testów, "a""b""c""d" ma być zamienione na prawdziwe odpowiedzi (i tak sie losuje to nie moze byćt ak)
//Czyli właściwie po prostu zamiast "pytanie x?" wpisać faktyczne pytanie, a tam gdzie a-b-c-d to odpowiedz i

const easyQues = [
    { question: "Jaka jest stolica Bułgarii?", answers: ["Płowdiw","Burgas","Sofia","Warna"], correct:2 },
    { question: "Nad jakim morzem leży Bułgaria?", answers: ["Adriatyckim","Czarnym","Śródziemnym","Egejskim"], correct:1 },
    { question: "Jakie kolory ma flaga Bułgarii?", answers: ["Niebieski, biały, czerwony","Zielony, żółty, czerwony","Czarny, zielony, czerwony","Biały, zielony, czerwony"], correct:3 },
    { question: "Jakiego alfabetu używa się w Bułgarii?", answers: ["Cyrylicy","Arabskiego","Greckiego","Łacińskiego"], correct:0 },
    { question: "Na jakim półwyspie leży Bułgaria?", answers: ["Bałkańskim","Skandynawskim","Iberyjskim","Apenińskim"], correct:0 },
    { question: "Z jakiego regionu pochodzi słynny bułgarski olejek różany?", answers: ["Rodopy","Dolina Róż","Riła","Tracja"], correct:1 },
    { question: "Jakiego koloru NIE ma na fladze Bułgarii?", answers: ["Białego","Czerwonego","Zielonego","Niebieskiego"], correct:3 },
    { question: "Jakim językiem mówi się w Bułgarii?", answers: ["Serbskim","Rumuńskim","Bułgarskim","Rosyjskim"], correct:2 },
    { question: "Jakie zwierzę jest jednym z symboli Bułgarii?", answers: ["Lew","Orzeł","Niedźwiedź","Wilk"], correct:0 },
    { question: "Jak nazywa się największe miasto portowe Bułgarii nad Morzem Czarnym?", answers: ["Burgas","Warna","Sozopol","Nesebyr"], correct:1 }
];

const hardQues = [
    { question: "Jaką walutę ma Bułgaria?", answers: ["Euro","Lew","Dinar","Forint"], correct:0 },
    { question: "Jak nazywa się bułgarska róża, jeden z symboli kraju?", answers: ["Róża dzika","Róża herbaciana","Róża alpejska","Róża damasceńska"], correct:3 },
    { question: "Do jakiej organizacji należy Bułgaria?", answers: ["do żadnej","tylko UE","NATO i UE","tylko NATO"], correct:2 },
    { question: "W którym wieku powstało pierwsze państwo bułgarskie?", answers: ["V","VII","IX","X"], correct:1 },
    { question: "Jak nazywa się najstarsze miasto w Bułgarii (jedno z najstarszych w Europie)?", answers: ["Sofia","Warna","Płowdiw","Nesebyr"], correct:2 },
    { question: "W jakim mieście znajduje się słynny Sobór Aleksandra Newskiego?", answers: ["Płowdiw","Sofia","Warna","Burgas"], correct:1 },
    { question: "Jakie imperium rządziło Bułgarią przez prawie 500 lat?", answers: ["Osmańskie","Austro-Węgierskie","Bizantyjskie","Rzymskie"], correct:0 },
    { question: "Jak nazywa się najwyższy szczyt Bułgarii?", answers: ["Wichren","Vitosha","Botev","Musala"], correct:3 },
    { question: "Który starożytny lud zamieszkiwał tereny dzisiejszej Bułgarii?", answers: ["Trakowie","Celtowie","Germanie","Wikingowie"], correct:0 },
    { question: "PW którym roku Bułgaria weszła do Unii Europejskiej?", answers: ["2001","2007","2004","2010"], correct:1 },
    { question: "Jak nazywa się słynny bułgarski klasztor wpisany na listę UNESCO?", answers: ["Rylski","Bachkowo","Trojański","Rozhen"], correct:0 },
    { question: "Jakie miasto było jedną z dawnych stolic Bułgarii?", answers: ["Ruse","Burgas","Tyrnowo","Warna"], correct:2 },
    { question: "Jak nazywa się tradycyjna bułgarska ozdoba z czerwonej i białej nitki?", answers: ["Kukeri","Surwa","Hora","Martenica"], correct:3 },
    { question: "Jak nazywa się najwyższe pasmo górskie w Bułgarii?", answers: ["Piryn","Riła","Rodopy","Stara Płanina"], correct:1 },
    { question: "Jak nazywa się tradycyjny bułgarski zwyczaj chodzenia po rozżarzonych węglach?", answers: ["Nestinarstwo","Martenica","Kukeri","Hora"], correct:0 }
];

let isEasy, questions = [],
    order = [],
    index = 0,
    score = 0;

//===================== LOSOWANIE =====================//
function shuffle(arr) {
    return arr.sort(function () {
        return Math.random() - 0.5;
    });
}

//===================== WYBÓR POZIOMU =====================//
function wybierzPoziomTrudnosci() {
    main.innerHTML = `
        <h2 style="font-size:50px;">Wybierz poziom trudności</h2>
            <div id="poziomyFlex">
            <button class="buttonyPoziom" onclick="startQuiz(true)">Łatwy</button>
            <button class="buttonyPoziom" onclick="startQuiz(false)">Trudny</button>
        </div>
    `;
}

//===================== START QUIZU =====================//
function startQuiz(easy) {
    isEasy = easy;
    questions = easy ? easyQues : hardQues;
    const limit = easy ? 10 : 15;
    order = shuffle(Array.from({
        length: questions.length
    }, function (_, i) {
        return i;
    })).slice(0, limit);
    index = 0;
    score = 0;
    pokazPytanie();
}

//===================== POKAZANIE PYTANIA =====================//
function pokazPytanie() {
    if (index >= order.length) {
        zakonczQuiz();
        return;
    }

    const q = questions[order[index]];

    let ans = [];
    for (let i = 0; i < q.answers.length; i++) {
        ans.push({
            t: q.answers[i],
            i: i
        });
    }
    ans = shuffle(ans);

    //OLD
    //let html = `<h2>Pytanie ${index+1} z ${order.length}</h2><h3>${q.question}</h3><div id="answersContainer">`;
    let html = `
    <div id="quizBox">
        <h2 id="quizCounter">Pytanie ${index+1} z ${order.length}</h2>
        <h3 id="quizQuestion">${q.question}</h3>
        <div id="answersContainer" id="answersGrid">
`;

    for (let a of ans) html += `<button class="answerBtn" data-i="${a.i}" onclick="sprawdzOdpowiedz(this)">${a.t}</button>`;
    main.innerHTML = html + "</div></div>";
}

//===================== SPRAWDZANIE ODPOWIEDZI =====================//
function sprawdzOdpowiedz(btn) {
    const chosen = +btn.dataset.i;
    const q = questions[order[index]];

    if (chosen === q.correct) {
        btn.style.background = "green";
        score++;
    } else {
        btn.style.background = "red";
        document.querySelectorAll(".answerBtn").forEach(b => {
            if (+b.dataset.i === q.correct) b.style.background = "green";
        });
    }
    document.querySelectorAll(".answerBtn").forEach(b => b.disabled = true);

    setTimeout(() => {
        index++;
        pokazPytanie();
    }, 1000);
}

//===================== KONIEC QUIZU =====================//

function zakonczQuiz() {
    main.innerHTML = `
    <div id="quizEnd">
        <h2>Koniec quizu</h2>
        <p id="quizScore">Wynik: ${score} / ${order.length}</p>
        <input id="name" id="nameInput" placeholder="Twoje imię, klasa">
        <button id="saveBtn" onclick="zapiszWynik()">Zapisz</button>
    </div>
    `;
}


//===================== RANKING =====================//
function zapiszWynik() {
    const name = document.getElementById("name").value || "Anonim";
    const id = isEasy ? "rankingEasy" : "rankingHard";
    const r = JSON.parse(localStorage.getItem(id)) || [];
    r.push({
        name,
        score,
        total: order.length
    });
    r.sort((a, b) => b.score - a.score);
    localStorage.setItem(id, JSON.stringify(r.slice(0, 5)));
    pokazRanking(id);
    wybierzPoziomTrudnosci();
}

function pokazRanking(id) {
    const ol = document.getElementById(id);
    const r = JSON.parse(localStorage.getItem(id)) || [];
    if (r.length === 0) {
        ol.innerHTML = "<li>Brak wyników.</li>";
        return;
    }
    ol.innerHTML = "";
    for (let i = 0; i < r.length; i++) {
        const e = r[i];
        ol.innerHTML += `<li>${i+1}. ${e.name} - ${e.score}/${e.total} pytań</li>`;
    }
}

//===================== ZAKOŃCZ WCZEŚNIEJ =====================//
document.getElementById("zakoncz").addEventListener("click", () => {
    isEasy = null;
    index = 0;
    score = 0;
    wybierzPoziomTrudnosci();
});

//===================== RESETUJ RANKING =====================//
document.getElementById("reset").addEventListener("click", () => {
    localStorage.removeItem("rankingEasy");
    localStorage.removeItem("rankingHard");
    pokazRanking("rankingEasy");
    pokazRanking("rankingHard");
});

//===================== START =====================//
window.onload = () => {
    pokazRanking("rankingEasy");
    pokazRanking("rankingHard");
    wybierzPoziomTrudnosci();
};