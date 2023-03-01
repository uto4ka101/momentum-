(()=>{
    "use strict";
    const e = document.querySelector(".date");
    function t(t="en") {
        const n = new Date;
        e.textContent = n.toLocaleDateString(t, {
            weekday: "long",
            month: "long",
            day: "numeric"
        })
    }
    const n = {
        en: {
            morning: "Good morning ",
            afternoon: "Good afternoon ",
            evening: "Good evening ",
            night: "Good night "
        },
        ru: {
            morning: "Доброго утра ",
            afternoon: "Доброго дня ",
            evening: "Доброго вечера",
            night: "Доброй ночи "
        }
    };
    function o(e="en") {
        const t = document.querySelector(".greeting")
          , o = document.querySelector(".name");
        let r = c((new Date).getHours());
        t.textContent = n[e][r],
        o.placeholder = "ru" === e ? "[Введите имя]" : "[Enter name]",
        window.addEventListener("beforeunload", (function() {
            localStorage.setItem("name", o.value)
        }
        )),
        window.addEventListener("load", (function() {
            localStorage.getItem("name") && (o.value = localStorage.getItem("name"))
        }
        ))
    }
    let r = c((new Date).getHours());
    function c(e) {
        return e >= 6 && e < 12 ? "morning" : e >= 12 && e < 18 ? "afternoon" : e >= 18 ? "evening" : "night"
    }
    const l = document.querySelector(".city")
      , a = document.querySelector(".weather-icon")
      , s = document.querySelector(".weather-error")
      , i = document.querySelector(".temperature")
      , u = document.querySelector(".weather-description")
      , d = document.querySelector(".wind")
      , m = document.querySelector(".humidity");
    async function y(e="en") {
        l.value || "en" !== e ? "Minsk" === l.value && "ru" === e ? l.value = "Минск" : "Минск" === l.value && "en" === e && (l.value = "Minsk") : l.value = "Minsk",
        window.addEventListener("load", r);
        const t = `https://api.openweathermap.org/data/2.5/weather?q=${l.value}&lang=${e}&appid=b33cb6b210e2ddbd5bf0e8a8bc760b96&units=metric`, n = await fetch(t), o = await n.json();
        if ("404" === o.cod)
            return s.textContent = "ru" === e ? "Такой город не найден" : "Such city has not been found",
            i.textContent = "",
            u.textContent = "",
            d.textContent = "",
            m.textContent = "",
            void (a.innerHTML = "");
        function r() {
            localStorage.getItem("city") && (l.value = localStorage.getItem("city"))
        }
        s.textContent = "",
        a.className = "weather-icon owf",
        a.classList.add(`owf-${o.weather[0].id}`),
        i.textContent = `${Math.round(o.main.temp)}°C`,
        u.textContent = o.weather[0].description,
        "ru" === e ? (d.textContent = `Скорость ветра: ${Math.round(o.wind.speed)} м/с`,
        m.textContent = `Влажность: ${Math.round(o.main.humidity)}%`) : (d.textContent = `Wind speed: ${Math.round(o.wind.speed)} m/s`,
        m.textContent = `Humidity: ${Math.round(o.main.humidity)}%`),
        window.addEventListener("beforeunload", (function() {
            localStorage.setItem("city", l.value)
        }
        )),
        window.addEventListener("load", r)
    }
    const g = document.querySelector(".quote")
      , h = document.querySelector(".author");
    async function f(e="en") {
        let t = "./js/quotes-en.json";
        t = "ru" === e ? "./js/quotes-ru.json" : "./js/quotes-en.json";
        const n = await fetch(t), o = await n.json();
        let r = Math.floor(Math.random() * o.quotes.length);
        g.textContent = `"${o.quotes[r].quote}"`,
        h.textContent = o.quotes[r].author
    }
    const S = [{
        title: "Above & Beyond feat. OceanLab - Breaking Ties",
        src: "./assets/sounds/Aqua Caelestis.mp3",
        duration: "0:46"
    }, {
        title: "Summer Wind",
        src: "./assets/sounds/Summer Wind.mp3",
        duration: "2:53"
    }, {
        title: "Ennio Morricone",
        src: "./assets/sounds/Ennio Morricone.mp3",
        duration: "1:37"
    }, {
        title: "River Flows In You",
        src: "./assets/sounds/River Flows In You.mp3",
        duration: "1:37"
    }, 

]
      , v = document.querySelector(".time");
    !function e() {
        const t = (new Date).toLocaleTimeString();
        v.textContent = t,
        setTimeout(e, 1e3)
    }
    (),
    t(),
    o(),
    y(),
    f(),
    function() {
        const e = document.querySelector(".play-prev")
          , t = document.querySelector(".play")
          , n = document.querySelector(".play-next")
          , o = document.querySelector(".play-list")
          , r = document.querySelector(".player-name")
          , c = document.getElementById("player-progress-bar")
          , l = document.querySelector(".player-current-time")
          , a = document.querySelector(".player-duration")
          , s = document.querySelector(".player-volume")
          , i = document.getElementById("range-volume")
          , u = document.querySelector(".player-minimize")
          , d = new Audio;
        let m = 0
          , y = !1;
        function g() {
            o.querySelectorAll("li")[m].classList.toggle("item-active")
        }
        function h() {
            y ? (d.pause(),
            y = !1,
            f()) : (o.querySelectorAll("li")[m].classList.add("item-active"),
            k(),
            d.play(),
            y = !0,
            f())
        }
        function f() {
            y ? o.querySelectorAll("li")[m].classList.add("item-active-play") : o.querySelectorAll("li")[m].classList.remove("item-active-play")
        }
        function v() {
            t.classList.toggle("pause")
        }
        function p(e) {
            let t = e.offsetX / i.offsetWidth;
            t = Math.floor(100 * t) / 100,
            t < .95 ? t += .05 : t >= .95 ? t = 1 : t > .05 && (t -= .05),
            t <= .05 && (t = 0),
            d.volume = t,
            i.value = 100 * t,
            i.style.background = `linear-gradient(to right, rgb(240, 163, 91) 0%, rgb(240, 163, 91) ${100 * t}%, #ffffff ${100 * t}%, #ffffff 100%)`,
            0 == d.volume ? (s.classList.remove("player-volume-yes"),
            s.classList.add("player-volume-no")) : (s.classList.remove("player-volume-no"),
            s.classList.add("player-volume-yes"))
        }
        function q(e) {
            e = Math.floor(e);
            let t = Math.floor(e / 60)
              , n = Math.floor(e - 60 * t)
              , o = n;
            return n < 10 && (o = "0" + n),
            t + ":" + o
        }
        function L() {
            let e = Math.floor(d.currentTime) / Math.floor(d.duration) * 100;
            isNaN(e) ? (e = 0,
            a.innerHTML = "0:00") : a.innerHTML = q(d.duration),
            c.value = e,
            l.innerHTML = q(d.currentTime),
            c.style.background = `linear-gradient(to right, rgb(240, 163, 91) 0%, rgb(240, 163, 91) ${e}%, #ffffff ${e}%, #ffffff 100%)`
        }
        function w(e) {
            const t = e.offsetX / c.offsetWidth * d.duration;
            d.currentTime = t
        }
        function k() {
            r.textContent = S[m].title
        }
        function b() {
            window.innerWidth < 1024 && (o.classList.remove("active"),
            document.querySelector(".player-controls").style.borderBottomLeftRadius = "10px",
            document.querySelector(".player-controls").style.borderBottomRightRadius = "10px")
        }
        d.src = S[m].src,
        S.forEach((e=>{
            const t = document.createElement("li");
            t.classList.add("play-item"),
            t.textContent = e.title,
            o.append(t)
        }
        )),
        g(),
        k(),
        d.addEventListener("play", v),
        d.addEventListener("pause", v),
        d.addEventListener("ended", (function() {
            g(),
            m++,
            m > 9 && (m = 0),
            d.src = S[m].src,
            y = !1,
            h()
        }
        )),
        t.addEventListener("click", h),
        n.addEventListener("click", (function() {
            g(),
            m++,
            m > S.length - 1 && (m = 0),
            d.src = S[m].src,
            y ? (y = !1,
            h(),
            v()) : (y = !1,
            h())
        }
        )),
        e.addEventListener("click", (function() {
            g(),
            m--,
            m < 0 && (m = S.length - 1),
            d.src = S[m].src,
            y ? (y = !1,
            h(),
            v()) : (y = !1,
            h())
        }
        )),
        o.querySelectorAll(".play-item").forEach(((e,t)=>{
            e.addEventListener("click", (()=>{
                let e = m;
                m = t,
                d.src = S[m].src,
                y && e === m ? (y = !0,
                h(),
                v()) : y && e !== m ? (o.querySelectorAll("li")[e].classList.remove("item-active-play"),
                o.querySelectorAll("li")[e].classList.remove("item-active"),
                y = !1,
                h(),
                v()) : (o.querySelectorAll("li")[e].classList.remove("item-active-play"),
                o.querySelectorAll("li")[e].classList.remove("item-active"),
                y = !1,
                h())
            }
            ))
        }
        )),
        u.addEventListener("click", (function() {
            o.classList.toggle("active"),
            o.classList.contains("active") ? (document.querySelector(".player-controls").style.borderBottomLeftRadius = "",
            document.querySelector(".player-controls").style.borderBottomRightRadius = "") : (document.querySelector(".player-controls").style.borderBottomLeftRadius = "10px",
            document.querySelector(".player-controls").style.borderBottomRightRadius = "10px")
        }
        )),
        b(),
        window.addEventListener("resize", b),
        s.addEventListener("click", (function() {
            0 == d.volume ? (d.volume = i.value / 100,
            s.classList.remove("player-volume-no"),
            s.classList.add("player-volume-yes")) : (d.volume = 0,
            s.classList.remove("player-volume-yes"),
            s.classList.add("player-volume-no"))
        }
        )),
        window.addEventListener("load", L),
        d.addEventListener("timeupdate", L);
        let E = !1;
        i.addEventListener("click", p),
        i.addEventListener("mousemove", (e=>E && p(e))),
        i.addEventListener("mousedown", (()=>E = !0)),
        i.addEventListener("mouseup", (()=>E = !1)),
        c.addEventListener("click", w),
        c.addEventListener("mousemove", (e=>E && w(e))),
        c.addEventListener("mousedown", (()=>E = !0)),
        c.addEventListener("mouseup", (()=>E = !1))
    }(),
    function() {
        const e = document.querySelector(".links-list")
          , t = document.querySelector(".links-custom-list");
        function n() {
            e.classList.toggle("active"),
            document.querySelector(".new-link-wrapper").classList.toggle("active")
        }
        document.querySelector(".links-toggle").addEventListener("click", (()=>{
            document.querySelector(".links-inner-cotainer ").classList.toggle("active")
        }
        )),
        document.querySelector(".new-link-btn").addEventListener("click", n),
        document.querySelector(".new-link-back").addEventListener("click", n),
        document.querySelector(".new-link-create").addEventListener("click", (()=>{
            !function() {
                if ("" != o.value && "" != r.value) {
                    let e = document.createElement("li");
                    e.classList.add("links-item");
                    let a = document.createElement("a");
                    a.href = `${r.value}`,
                    a.target = "_blank",
                    a.textContent = o.value;
                    let s = document.createElement("span");
                    s.classList.add("edit-link-btn"),
                    e.appendChild(a),
                    e.appendChild(s),
                    t.append(e),
                    o.value = "",
                    r.value = "",
                    n(),
                    c = document.querySelectorAll(".edit-link-btn"),
                    console.log("update amount links"),
                    c.forEach(((e,t)=>{
                        e.addEventListener("click", (()=>l()))
                    }
                    ))
                }
            }()
        }
        ));
        const o = document.querySelector("#link-name")
          , r = document.querySelector("#link-reference");
        o.addEventListener("blur", (()=>{
            "" == o.value ? o.style.borderColor = "red" : o.style.borderColor = ""
        }
        )),
        r.addEventListener("blur", (()=>{
            "" == r.value ? r.style.borderColor = "red" : r.style.borderColor = ""
        }
        ));
        let c = document.querySelectorAll(".edit-link-btn");
        function l(e) {
            document.querySelector(".links-edit-menu").classList.toggle("active")
        }
        c.forEach(((e,t)=>{
            e.addEventListener("click", (()=>l()))
        }
        ))
    }(),
    function() {
        const e = document.querySelector("body")
          , t = document.querySelector(".slide-prev")
          , n = document.querySelector(".slide-next");
        let o = "git"
          , c = Math.floor(20 * Math.random()) + 1;
        function l(t, n) {
            t = t.toString().padStart(2, "0");
            const o = new Image;
            let r = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${n}/${t}.jpg`;
            o.src = r,
            o.onload = ()=>{
                e.style.backgroundImage = `url(${r})`
            }
        }
        async function a(t) {
            const n = `https://api.unsplash.com/photos/random?orientation=landscape&query=nature+${t}&client_id=SEOkfivalbVQJ-Jp1Zi04LfhSEVVZ4YrV70FPCG1aOM`
              , o = await fetch(n);
            let r = (await o.json()).urls.full;
            const c = new Image;
            c.src = r,
            c.onload = ()=>{
                e.style.backgroundImage = `url(${r})`
            }
        }
        async function s(t) {
            const n = await fetch("https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=22dea649c7d47ada1b23521e516df87b&tags=nature&extras=url_l&format=json&nojsoncallback=1")
              , o = await n.json();
            let r = o.photos.photo[Math.floor(Math.random() * o.photos.photo.length) + 1].url_l;
            const c = new Image;
            c.src = r,
            c.onload = ()=>{
                e.style.backgroundImage = `url(${r})`
            }
        }
        function i(e, t) {
            "git" === e ? l(c, t) : "unsplash" === e ? a(t) : s()
        }
        function u(e) {
            window.addEventListener("beforeunload", (function() {
                localStorage.setItem("sourceLS", e)
            }
            )),
            i(e, r)
        }
        t.addEventListener("click", (()=>{
            "git" === o ? (1 === c ? c = 20 : c--,
            l(c, r)) : "unsplash" === o ? a(r) : "flickr" === o && s()
        }
        )),
        n.addEventListener("click", (()=>{
            "git" === o ? (20 === c ? c = 1 : c++,
            l(c, r)) : "unsplash" === o ? a(r) : "flickr" === o && s()
        }
        )),
        document.querySelector("#set-bg-git").addEventListener("click", (()=>(u("git"),
        o = "git"))),
        document.querySelector("#set-bg-unsplash").addEventListener("click", (()=>(u("unsplash"),
        o = "unsplash"))),
        document.querySelector("#set-bg-flickr").addEventListener("click", (()=>(u("flickr"),
        o = "flickr"))),
        document.addEventListener("DOMContentLoaded", (function() {
            localStorage.getItem("sourceLS") ? (o = localStorage.getItem("sourceLS"),
            i(o, r),
            "unsplash" === o ? document.querySelector("#set-bg-unsplash").checked = !0 : "flickr" === o && (document.querySelector("#set-bg-flickr").checked = !0)) : i(o, r)
        }
        )),
        i(o, r)
    }(),
    function(e) {
        const n = document.querySelector(".set-toggle")
          , r = document.querySelector(".set-inner-container")
          , c = document.querySelectorAll(".set-btn")
          , l = document.querySelectorAll(".set-box")
          , a = document.getElementById("set-lang-en")
          , s = document.getElementById("set-lang-ru");
        function i(n) {
            const r = document.querySelector(".set-lang-btn")
              , c = document.querySelector(".set-background-btn")
              , l = document.querySelector(".set-show-btn")
              , a = document.querySelector(".set-about-btn")
              , s = document.querySelector(".set-lang-box .set-box-title")
              , i = document.querySelector(".set-background-box .set-box-title")
              , u = document.querySelector(".set-show-box .set-box-title")
              , d = document.querySelector(".set-about-box .set-box-title");
            return "ru" === n ? (t(e = "ru"),
            o(e),y(e),f(e),
            r.textContent = "Язык",
            c.textContent = "Фон",
            l.textContent = "Отображение",
            a.textContent = "О программе",
            s.textContent = "Язык",
            i.textContent = "Фон",
            u.textContent = "Отображение",
            d.textContent = "О программе",
            document.querySelector('label[for="set-show-player"]').textContent = "Аудио   плеер",
            document.querySelector('label[for="set-show-weather"]').textContent = "Погода",
            document.querySelector('label[for="set-show-time"]').textContent = "Время",
            document.querySelector('label[for="set-show-date"]').textContent = "Дата",
            document.querySelector('label[for="set-show-greeting"]').textContent = "Приветствие",
            document.querySelector('label[for="set-show-quote"]').textContent = "Цитата",
            document.querySelector('label[for="set-show-links"]').textContent = "Ссылки",
            document.querySelector(".links-toggle").textContent = "Ссылки",
            document.querySelector(".link-newtab a").textContent = "Новая вкладка",
            document.querySelector(".new-link-btn").textContent = "Новая ссылка",
            e) : (t(e = "en"),o(e),y(e),f(e),
            r.textContent = "Language",
            c.textContent = "Background",
            l.textContent = "Show",
            a.textContent = "About",
            s.textContent = "Language",
            i.textContent = "Background",
            u.textContent = "Show",
            a.textContent = "About",
            document.querySelector('label[for="set-show-player"]').textContent = "Audio   player",
            document.querySelector('label[for="set-show-weather"]').textContent = "Weather",
            document.querySelector('label[for="set-show-time"]').textContent = "Time",
            document.querySelector('label[for="set-show-date"]').textContent = "Date",
            document.querySelector('label[for="set-show-greeting"]').textContent = "Greeting",
            document.querySelector('label[for="set-show-quote"]').textContent = "Quote",
            document.querySelector('label[for="set-show-links"]').textContent = "Links",
            document.querySelector(".links-toggle").textContent = "Links",
            document.querySelector(".link-newtab a").textContent = "New tab",
            document.querySelector(".new-link-btn").textContent = "New link",e)
        }
        n.addEventListener("click", (()=>{
            r.classList.toggle("active")
        }
        )),
        c.forEach(((e,t)=>{
            e.addEventListener("click", (()=>{
                for (let e = 0; e < c.length; e++)
                    c[e].classList.remove("active"),
                    l[e].classList.remove("active");
                c[t].classList.add("active"),
                l[t].classList.add("active")
            }
            ))
        }
        )),
        a.addEventListener("click", (()=>{
            i("en")
        }
        )),
        s.addEventListener("click", (()=>{
            i("ru")
        }
        ));
        let u = {
            player: !0,
            weather: !0,
            time: !0,
            date: !0,
            greeting: !0,
            quote: !0,
            links: !0
        };
        const d = document.getElementById("set-show-player")
          , m = document.getElementById("set-show-weather")
          , g = document.getElementById("set-show-time")
          , h = document.getElementById("set-show-date")
          , S = document.getElementById("set-show-greeting")
          , v = document.getElementById("set-show-quote")
          , p = document.getElementById("set-show-links");
        function q() {
            return !0 !== d.checked ? (document.querySelector(".player").style.opacity = "0",
            u.player = !1) : (document.querySelector(".player").style.opacity = "1",
            u.player = !0)
        }
        function L() {
            !0 !== m.checked ? (document.querySelector(".weather").style.opacity = "0",
            u.weather = !1) : (document.querySelector(".weather").style.opacity = "1",
            u.weather = !0)
        }
        function w() {
            !0 !== g.checked ? (document.querySelector(".time").style.opacity = "0",
            u.time = !1) : (document.querySelector(".time").style.opacity = "1",
            u.time = !0)
        }
        function k() {
            !0 !== h.checked ? (document.querySelector(".date").style.opacity = "0",
            u.date = !1) : (document.querySelector(".date").style.opacity = "1",
            u.date = !0)
        }
        function b() {
            !0 !== S.checked ? (document.querySelector(".greeting-container").style.opacity = "0",
            u.greeting = !1) : (document.querySelector(".greeting-container").style.opacity = "1",
            u.greeting = !0)
        }
        function E() {
            !0 !== v.checked ? (document.querySelector(".quote-wrapper").style.opacity = "0",
            u.quote = !1) : (document.querySelector(".quote-wrapper").style.opacity = "1",
            u.quote = !0)
        }
        function x() {
            !0 !== p.checked ? (document.querySelector(".links").style.opacity = "0",
            u.links = !1) : (document.querySelector(".links").style.opacity = "1",
            u.links = !0)
        }
        d.addEventListener("change", q),
        m.addEventListener("change", L),
        g.addEventListener("change", w),
        h.addEventListener("change", k),
        S.addEventListener("change", b),
        v.addEventListener("change", E),
        p.addEventListener("change", x),
        window.addEventListener("beforeunload", (function() {
            localStorage.setItem("langLS", e),
            localStorage.setItem("showSettings", JSON.stringify(u))
        }
        )),
        window.addEventListener("load", (function() {
            localStorage.getItem("langLS") && (i(e = localStorage.getItem("langLS")),
            "ru" === e && (s.checked = !0)),
            localStorage.getItem("showSettings") && (u = JSON.parse(localStorage.getItem("showSettings")),
            u.player || (d.checked = !1, q()), u.weather || (d.checked = !1, L()), u.time || (g.checked = !1, w()),
            u.date || (h.checked = !1,k()), u.greeting || (S.checked = !1,b()),u.quote || (v.checked = !1,E()),u.links || (p.checked = !1,x()))
        }
        )),
        document.querySelector(".change-quote").addEventListener("click", (()=>{
            f(e)
        }
        )),
        document.querySelector(".city").addEventListener("change", (()=>y(e)))
    }("en"),
    console.log("\nПриветвую!\n\nВыполнено:\n1. Часы и календарь +15\n2. Приветствие +10\n3. Смена фонового изображения +20\n4. Виджет погоды +15\n5. Виджет цитата дня +10\n6. Аудиоплеер +15\n7. Продвинутый аудиоплеер (реализуется без использования библиотек) +20\n8. Перевод приложения на два языка (en/ru или en/be) +15\n9.  Получение фонового изображения от API +10\n\nЧастично выполенно: \n10. Настройки приложения +17 из 20. \nНе добавил возможнось выбора тегов. Скорее из-за странной работы flickr. Например если узываешь два тега: nature + afternoon + большие фото, то оно находит только одно фото. \n11. Дополнительный функционал на выбор. Links +7\nНе сделал действия при нажатии на кнопки edit and delete.\n\nScore: 150/150\n")
}
)();
