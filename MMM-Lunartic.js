/* Magic Mirror
 * Module: MMM-Lunartic
 *
 * By Mykle1
 *
 */
Module.register("MMM-Lunartic", {

    // Module config defaults.
    defaults: {
        mode: "rotating", // rotating or static
        image: "current", // animation, current, DayNight or static (phases image)
        useHeader: false, // true if you want a header
        header: "The Lunartic is in my head", // Any text you want. useHeader must be true
        maxWidth: "300px",
        distance: "miles", // miles or km
        sounds: "no", // for wolf howls, only on a full moon
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 30 * 60 * 1000, // 30 minutes
        dateOptions: { year: 'numeric', month: 'long', day: 'numeric' },
        dateLocale: "fr-FR",
    },

    getStyles: function() {
        return ["MMM-Lunartic.css"];
    },

    getTranslations: function() {
        return {
            en: "translations/en.json",
            fr: "translations/fr.json",
            es: "translations/es.json",
            de: "translations/de.json",
            sv: "translations/sv.json",
            nl: "translations/nl.json",
            gl: "translations/gl.json",
            ca: "translations/ca.json",
        };
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        Log.info("updateInterval: " + this.config.updateInterval);
        requiresVersion: "2.1.0",
        this.url = "https://mykle.herokuapp.com/moon";
        this.Lunartic = {};
        this.info = {};
        this.activeItem = 0;
        this.scheduleUpdate();
    },

    getDate: function(seconds) {
        var myDate = new Date();
        myDate.setTime(seconds*1000);
        return myDate.toLocaleDateString(this.config.dateLocale, this.config.dateOptions);
    },


    getDom: function() {

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

        if (!this.loaded) {
            wrapper.innerHTML = this.translate("When the Moon hits your eye . . .");
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }

        if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("xsmall", "bright", "light");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }

        var Lunartic = this.Lunartic;
        var distance = this.config.distance; // miles or km
        var image = this.config.image; // animation, current, DayNight or static

        // The image choices
        // moon animation
        var pic = document.createElement("div");
        var img = document.createElement("img");
            img.classList.add("photo");
        if (this.config.image == "animation") {
            img.src = "modules/MMM-Lunartic/pix/moon.gif";
            pic.appendChild(img);
            wrapper.appendChild(pic);

            // Current image from the US Navy
        } else if (this.config.image == "current") {
            var base_url="https://api.usno.navy.mil/imagery/moon.png?date=";
            //var base_url="http://res.cloudinary.com/dzuwcg2bd/image/fetch/c_scale,q_auto:best,w_370/https://api.usno.navy.mil/imagery/moon.png?date=";
            var myDate = new Date();
            var myDateTxt=myDate.toLocaleDateString('en-US');
            var myTimeTxt=myDate.toLocaleTimeString('en-GB', { hours: 'numeric', minutes: 'numeric'});
            Log.info(base_url+myDateTxt+"&time="+myTimeTxt);
            img.src = base_url+myDateTxt+"&time="+myTimeTxt;
            //img.src = "http://api.usno.navy.mil/imagery/moon.png?date=today&time=now";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          } else if (this.config.image == "local_dynamic") {
            ///////////////////////// Temporary till API is fixed ///////////////////// Start
            if (Math.round(this.info[5].ill) < 1) {
              img.src = "modules/MMM-Lunartic/pix/nm.png"; // ("New Moon");
            }
            if (Math.round(this.info[5].ill) == 1 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres1.png";
            }
            if (Math.round(this.info[5].ill) == 2 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres2.png";
            }
            if (Math.round(this.info[5].ill) == 3 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres5.png";
            }
            if (Math.round(this.info[5].ill) == 4 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres5.png";
            }
            if (Math.round(this.info[5].ill) == 5 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres5.png";
            }
            if (Math.round(this.info[5].ill) == 6 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres6.png";
            }
            if (Math.round(this.info[5].ill) == 7 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres10.png";
            }
            if (Math.round(this.info[5].ill) == 8 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres10.png";
            }
            if (Math.round(this.info[5].ill) == 9 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres10.png";
            }
            if (Math.round(this.info[5].ill) == 10 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres10.png";
            }
            if (Math.round(this.info[5].ill) == 11 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres11.png";
            }
            if (Math.round(this.info[5].ill) == 12 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres16.png";
            }
            if (Math.round(this.info[5].ill) == 13 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres16.png";
            }
            if (Math.round(this.info[5].ill) == 14 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres16.png";
            }
            if (Math.round(this.info[5].ill) == 15 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres16.png";
            }
            if (Math.round(this.info[5].ill) == 16 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres16.png";
            }
            if (Math.round(this.info[5].ill) == 17 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres17.png";
            }
            if (Math.round(this.info[5].ill) == 18 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres18.png";
            }
            if (Math.round(this.info[5].ill) == 19 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres23.png";
            }
            if (Math.round(this.info[5].ill) == 20 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres23.png";
            }
            if (Math.round(this.info[5].ill) == 21 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres23.png";
            }
            if (Math.round(this.info[5].ill) == 22 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres23.png";
            }
            if (Math.round(this.info[5].ill) == 23 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres23.png";
            }
            if (Math.round(this.info[5].ill) == 24 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres24.png";
            }
            if (Math.round(this.info[5].ill) == 25 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres26.png";
            }
            if (Math.round(this.info[5].ill) == 26 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres26.png";
            }
            if (Math.round(this.info[5].ill) == 27 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres32.png";
            }
            if (Math.round(this.info[5].ill) == 28 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres32.png";
            }
            if (Math.round(this.info[5].ill) == 29 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres32.png";
            }
            if (Math.round(this.info[5].ill) == 30 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres32.png";
            }
            if (Math.round(this.info[5].ill) == 31 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres32.png";
            }
            if (Math.round(this.info[5].ill) == 32 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres32.png";
            }
            if (Math.round(this.info[5].ill) == 33 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres33.png";
            }
            if (Math.round(this.info[5].ill) == 34 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres35.png";
            }
            if (Math.round(this.info[5].ill) == 35 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres35.png";
            }
            if (Math.round(this.info[5].ill) == 36 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres41.png";
            }
            if (Math.round(this.info[5].ill) == 37 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres41.png";
            }
            if (Math.round(this.info[5].ill) == 38 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres41.png";
            }
            if (Math.round(this.info[5].ill) == 39 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres41.png";
            }
            if (Math.round(this.info[5].ill) == 40 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres41.png";
            }
            if (Math.round(this.info[5].ill) == 41 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres41.png";
            }
            if (Math.round(this.info[5].ill) == 42 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres42.png";
            }
            if (Math.round(this.info[5].ill) == 43 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres46.png";
            }
            if (Math.round(this.info[5].ill) == 44 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres46.png";
            }
            if (Math.round(this.info[5].ill) == 45 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres46.png";
            }
            if (Math.round(this.info[5].ill) == 46 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres46.png";
            }
            if (Math.round(this.info[5].ill) == 47 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres50.png";
            }
            if (Math.round(this.info[5].ill) == 48 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres50.png";
            }
            if (Math.round(this.info[5].ill) == 49 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxcres50.png";
            }
            if (Math.round(this.info[5].ill) == 50 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib52.png";
            }
            if (Math.round(this.info[5].ill) == 51 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib52.png";
            }
            if (Math.round(this.info[5].ill) == 52  && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib52.png";
            }
            if (Math.round(this.info[5].ill) == 53  && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib52.png";
            }
            if (Math.round(this.info[5].ill) == 54  && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib52.png";
            }
            if (Math.round(this.info[5].ill) == 55 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib56.png";
            }
            if (Math.round(this.info[5].ill) == 56 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib56.png";
            }
            if (Math.round(this.info[5].ill) == 57 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib56.png";
            }
            if (Math.round(this.info[5].ill) == 58 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib56.png";
            }
            if (Math.round(this.info[5].ill) == 59 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib60.png";
            }
            if (Math.round(this.info[5].ill) == 60 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib60.png";
            }
            if (Math.round(this.info[5].ill) == 61 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib62.png";
            }
            if (Math.round(this.info[5].ill) == 62 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib62.png";
            }
            if (Math.round(this.info[5].ill) == 63 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib62.png";
            }
            if (Math.round(this.info[5].ill) == 64 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib62.png";
            }
            if (Math.round(this.info[5].ill) == 65 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib67.png";
            }
            if (Math.round(this.info[5].ill) == 66 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib67.png";
            }
            if (Math.round(this.info[5].ill) == 67 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib67.png";
            }
            if (Math.round(this.info[5].ill) == 68 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib67.png";
            }
            if (Math.round(this.info[5].ill) == 69  && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib69.png";
            }
            if (Math.round(this.info[5].ill) == 70  && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib69.png";
            }
            if (Math.round(this.info[5].ill) == 71 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib72.png";
            }
            if (Math.round(this.info[5].ill) == 72 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib72.png";
            }
            if (Math.round(this.info[5].ill) == 73 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib72.png";
            }
            if (Math.round(this.info[5].ill) == 74 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib72.png";
            }
            if (Math.round(this.info[5].ill) == 75 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib72.png";
            }
            if (Math.round(this.info[5].ill) == 76 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib77.png";
            }
            if (Math.round(this.info[5].ill) == 77 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib77.png";
            }
            if (Math.round(this.info[5].ill) == 78 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib78.png";
            }
            if (Math.round(this.info[5].ill) == 79 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib78.png";
            }
            if (Math.round(this.info[5].ill) == 80 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib78.png";
            }
            if (Math.round(this.info[5].ill) == 81 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib82.png";
            }
            if (Math.round(this.info[5].ill) == 82 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib82.png";
            }
            if (Math.round(this.info[5].ill) == 83 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib82.png";
            }
            if (Math.round(this.info[5].ill) == 84 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib82.png";
            }
            if (Math.round(this.info[5].ill) == 85 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib82.png";
            }
            if (Math.round(this.info[5].ill) == 86 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib86.png";
            }
            if (Math.round(this.info[5].ill) == 87  && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib87.png";
            }
            if (Math.round(this.info[5].ill) == 88  && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib87.png";
            }
            if (Math.round(this.info[5].ill) == 89  && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib87.png";
            }
            if (Math.round(this.info[5].ill) == 90 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib90.png";
            }
            if (Math.round(this.info[5].ill) == 91 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib90.png";
            }
            if (Math.round(this.info[5].ill) == 92 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib90.png";
            }
            if (Math.round(this.info[5].ill) == 93 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib93.png";
            }
            if (Math.round(this.info[5].ill) == 94 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib93.png";
            }
            if (Math.round(this.info[5].ill) == 95 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib93.png";
            }
            if (Math.round(this.info[5].ill) == 96 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib96.png";
            }
            if (Math.round(this.info[5].ill) == 97 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib96.png";
            }
            if (Math.round(this.info[5].ill) == 98 && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib98.png";
            }
            if (Math.round(this.info[5].ill) == 99  && this.info[6].stage == "waxing") {
              img.src = "modules/MMM-Lunartic/pix/waxgib99.png";
            }
            if (Math.round(this.info[5].ill) == 100) {
              img.src = "modules/MMM-Lunartic/pix/fm.png";
            }
            if (Math.round(this.info[5].ill) == 99 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib98.png";
            }
            if (Math.round(this.info[5].ill) == 98 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib98.png";
            }
            if (Math.round(this.info[5].ill) == 97 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib98.png";
            }
            if (Math.round(this.info[5].ill) == 96 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib96.png";
            }
            if (Math.round(this.info[5].ill) == 95 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib96.png";
            }
            if (Math.round(this.info[5].ill) == 94 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib96.png";
            }
            if (Math.round(this.info[5].ill) == 93 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib93.png";
            }
            if (Math.round(this.info[5].ill) == 92  && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib92.png";
            }
            if (Math.round(this.info[5].ill) == 91  && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib92.png";
            }
            if (Math.round(this.info[5].ill) == 90  && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib92.png";
            }
            if (Math.round(this.info[5].ill) == 89  && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib89.png";
            }
            if (Math.round(this.info[5].ill) == 88  && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib89.png";
            }
            if (Math.round(this.info[5].ill) == 87  && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib89.png";
            }
            if (Math.round(this.info[5].ill) == 86  && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib86.png";
            }
            if (Math.round(this.info[5].ill) == 85  && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib85.png";
            }
            if (Math.round(this.info[5].ill) == 84  && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib85.png";
            }
            if (Math.round(this.info[5].ill) == 83  && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib85.png";
            }
            if (Math.round(this.info[5].ill) == 82  && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib85.png";
            }
            if (Math.round(this.info[5].ill) == 81 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib81.png";
            }
            if (Math.round(this.info[5].ill) == 80 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib81.png";
            }
            if (Math.round(this.info[5].ill) == 79 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib81.png";
            }
            if (Math.round(this.info[5].ill) == 78 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib81.png";
            }
            if (Math.round(this.info[5].ill) == 77 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib77.png";
            }
            if (Math.round(this.info[5].ill) == 76 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib75.png";
            }
            if (Math.round(this.info[5].ill) == 75 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib75.png";
            }
            if (Math.round(this.info[5].ill) == 74 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib75.png";
            }
            if (Math.round(this.info[5].ill) == 73 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib75.png";
            }
            if (Math.round(this.info[5].ill) == 72 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib75.png";
            }
            if (Math.round(this.info[5].ill) == 71 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib71.png";
            }
            if (Math.round(this.info[5].ill) == 70 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib71.png";
            }
            if (Math.round(this.info[5].ill) == 69 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib71.png";
            }
            if (Math.round(this.info[5].ill) == 68 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib71.png";
            }
            if (Math.round(this.info[5].ill) == 67 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib67.png";
            }
            if (Math.round(this.info[5].ill) == 66 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib67.png";
            }
            if (Math.round(this.info[5].ill) == 65 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib67.png";
            }
            if (Math.round(this.info[5].ill) == 64 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib67.png";
            }
            if (Math.round(this.info[5].ill) == 63 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib67.png";
            }
            if (Math.round(this.info[5].ill) == 62 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib67.png";
            }
            if (Math.round(this.info[5].ill) == 61 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib60.png";
            }
            if (Math.round(this.info[5].ill) == 60 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib60.png";
            }
            if (Math.round(this.info[5].ill) == 59 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib60.png";
            }
            if (Math.round(this.info[5].ill) == 58 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib60.png";
            }
            if (Math.round(this.info[5].ill) == 57 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib60.png";
            }
            if (Math.round(this.info[5].ill) == 56 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib56.png";
            }
            if (Math.round(this.info[5].ill) == 55 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib56.png";
            }
            if (Math.round(this.info[5].ill) == 54 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib54.png";
            }
            if (Math.round(this.info[5].ill) == 53 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib54.png";
            }
            if (Math.round(this.info[5].ill) == 52 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib54.png";
            }
            if (Math.round(this.info[5].ill) == 51 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib54.png";
            }
            if (Math.round(this.info[5].ill) == 50 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanegib54.png";
            }
            if (Math.round(this.info[5].ill) == 49 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres49.png";
            }
            if (Math.round(this.info[5].ill) == 48 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres45.png";
            }
            if (Math.round(this.info[5].ill) == 47 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres45.png";
            }
            if (Math.round(this.info[5].ill) == 46 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres45.png";
            }
            if (Math.round(this.info[5].ill) == 45 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres45.png";
            }
            if (Math.round(this.info[5].ill) == 44 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres44.png";
            }
            if (Math.round(this.info[5].ill) == 43 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres38.png";
            }
            if (Math.round(this.info[5].ill) == 42 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres38.png";
            }
            if (Math.round(this.info[5].ill) == 41 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres38.png";
            }
            if (Math.round(this.info[5].ill) == 40 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres38.png";
            }
            if (Math.round(this.info[5].ill) == 39 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres38.png";
            }
            if (Math.round(this.info[5].ill) == 38 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres38.png";
            }
            if (Math.round(this.info[5].ill) == 37 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres34.png";
            }
            if (Math.round(this.info[5].ill) == 36 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres34.png";
            }
            if (Math.round(this.info[5].ill) == 35 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres34.png";
            }
            if (Math.round(this.info[5].ill) == 34 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres34.png";
            }
            if (Math.round(this.info[5].ill) == 33 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres28.png";
            }
            if (Math.round(this.info[5].ill) == 32 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres28.png";
            }
            if (Math.round(this.info[5].ill) == 31 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres28.png";
            }
            if (Math.round(this.info[5].ill) == 30 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres28.png";
            }
            if (Math.round(this.info[5].ill) == 29 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres28.png";
            }
            if (Math.round(this.info[5].ill) == 28 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres28.png";
            }
            if (Math.round(this.info[5].ill) == 27 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres25.png";
            }
            if (Math.round(this.info[5].ill) == 26 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres25.png";
            }
            if (Math.round(this.info[5].ill) == 25 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres25.png";
            }
            if (Math.round(this.info[5].ill) == 24 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres24.png";
            }
            if (Math.round(this.info[5].ill) == 23 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres20.png";
            }
            if (Math.round(this.info[5].ill) == 22 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres20.png";
            }
            if (Math.round(this.info[5].ill) == 21 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres20.png";
            }
            if (Math.round(this.info[5].ill) == 20 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres19.png";
            }
            if (Math.round(this.info[5].ill) == 19 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres19.png";
            }
            if (Math.round(this.info[5].ill) == 18 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres17.png";
            }
            if (Math.round(this.info[5].ill) == 17 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres17.png";
            }
            if (Math.round(this.info[5].ill) == 16 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres15.png";
            }
            if (Math.round(this.info[5].ill) == 15 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres15.png";
            }
            if (Math.round(this.info[5].ill) == 14 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres12.png";
            }
            if (Math.round(this.info[5].ill) == 13 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres12.png";
            }
            if (Math.round(this.info[5].ill) == 12 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres12.png";
            }
            if (Math.round(this.info[5].ill) == 11 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres10.png";
            }
            if (Math.round(this.info[5].ill) == 10 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres10.png";
            }
            if (Math.round(this.info[5].ill) == 9 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres8.png";
            }
            if (Math.round(this.info[5].ill) == 8 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres8.png";
            }
            if (Math.round(this.info[5].ill) == 7 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres6.png";
            }
            if (Math.round(this.info[5].ill) == 6 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres6.png";
            }
            if (Math.round(this.info[5].ill) == 5 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres5.png";
            }
            if (Math.round(this.info[5].ill) == 4 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres3.png";
            }
            if (Math.round(this.info[5].ill) == 3 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres3.png";
            }
            if (Math.round(this.info[5].ill) == 2 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres2.png";
            }
            if (Math.round(this.info[5].ill) == 1 && this.info[6].stage == "waning") {
              img.src = "modules/MMM-Lunartic/pix/wanecres1.png";
            }
            console.log(img.src);
            pic.appendChild(img);
            wrapper.appendChild(pic);
            ///////////////////////// Temporary till API is fixed ///////////////////// END
        } else if (this.config.image == "DayNight") {
            img.src = "http://api.usno.navy.mil/imagery/earth.png?date=today";
            pic.appendChild(img);
            wrapper.appendChild(pic);

            // Static moon image
        } else if (this.config.image == "static") {
            img.src = "modules/MMM-Lunartic/pix/static.jpg";
            pic.appendChild(img);
            wrapper.appendChild(pic);
        }

          // waxing, waning, etc..
          var stage = document.createElement("div");
              stage.classList.add("small", "normal", "stage");

          if (Math.round(this.info[5].ill) < 1 ) {
              stage.innerHTML = this.translate("New Moon - No visible moon");
              wrapper.appendChild(stage);

          } else if (Math.round(this.info[5].ill) > 1 && Math.round(this.info[5].ill) < 50 && this.info[6].stage == "waxing") {
              stage.innerHTML = this.translate("Waxing Crescent Moon");
              wrapper.appendChild(stage);

          } else if (Math.round(this.info[5].ill) == 50 && this.info[6].stage == "waxing") {
              stage.innerHTML = this.translate("First Quarter Half Moon");
              wrapper.appendChild(stage);

          } else if (Math.round(this.info[5].ill) > 50 && Math.round(this.info[5].ill) < 100 && this.info[6].stage == "waxing") {
              stage.innerHTML = this.translate("Waxing Gibbous Moon");
              wrapper.appendChild(stage);

          } else if (Math.round(this.info[5].ill) == 100) {
              stage.innerHTML = this.translate("Full Moon");
              wrapper.appendChild(stage);

              // create audio, only on full moon, wolf howling
           if (this.config.sounds == "yes") {
              var sound = new Audio();
              sound.src = 'modules/MMM-Lunartic/sounds/wolf.mp3';
              sound.loop = false;
              sound.play();
            }

          } else if (Math.round(this.info[5].ill) <= 100 && Math.round(this.info[5].ill) > 50 && this.info[6].stage == "waning") {
              stage.innerHTML = this.translate("Waning Gibbous Moon");
              wrapper.appendChild(stage);

          } else if (Math.round(this.info[5].ill) == 50 && this.info[6].stage == "waning") {
              stage.innerHTML = this.translate("Third Quarter Half Moon");
              wrapper.appendChild(stage);

          } else if (Math.round(this.info[5].ill) < 50 && Math.round(this.info[5].ill) >= 1 && this.info[6].stage == "waning") {
              stage.innerHTML = this.translate("Waning Crescent Moon");
              wrapper.appendChild(stage);

          }  else if (Math.round(this.info[5].ill) < 1) {
              stage.innerHTML = this.translate("New Moon - No visible moon");
              wrapper.appendChild(stage);
          }


            // distance from Earth's core
            var DFCOE = document.createElement("div");
                DFCOE.classList.add("xsmall", "dimmed", "DFCOE");
            if (this.config.distance == "miles") {
                DFCOE.innerHTML = this.translate("Distance from Earth's core = ") + (Math.round(this.info[0].dfcoe * 0.62137) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,') + " miles";
            } else {
                DFCOE.innerHTML = this.translate("Distance from Earth's core = ") + (Math.round(this.info[0].dfcoe) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,') + " km";
            }
            wrapper.appendChild(DFCOE);


            // distance from the sun
            var DFS = document.createElement("div");
                DFS.classList.add("xsmall", "dimmed", "DFS");
            if (this.config.distance == "miles") {
                DFS.innerHTML = this.translate("Distance from sun = ") + (Math.round(this.info[1].dfs * 0.62137) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,') + " miles";
            } else {
                DFS.innerHTML = this.translate("Distance from sun = ") + (Math.round(this.info[1].dfs) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,') + " km";
            }
            wrapper.appendChild(DFS);


            // Next full moon date
            var nextFullMoon = document.createElement("div");
            var dateTimeString = this.getDate(this.info[2].fm);
            nextFullMoon.classList.add("xsmall", "dimmed", "nextFullMoon");
            //	console.log (Lunartic); // checking data
            // Because next FM data doesn't occur till after the new moon
            if (this.info[2].fm * 1000 < new Date().valueOf()) {
                nextFullMoon.innerHTML = this.translate("The last full moon was ") + dateTimeString;
                wrapper.appendChild(nextFullMoon);
            } else {
                nextFullMoon.innerHTML = this.translate("The next full moon is ") + dateTimeString;
                wrapper.appendChild(nextFullMoon);
            }


            // Next new moon date
            var nextNewMoon = document.createElement("div");
            dateTimeString = this.getDate(this.info[3].nnm)
            nextNewMoon.classList.add("xsmall", "dimmed", "nextNewMoon");
            nextNewMoon.innerHTML = this.translate("The next new moon is ") + dateTimeString;
            wrapper.appendChild(nextNewMoon);


            // how old the current moon is
            var age = document.createElement("div");
            age.classList.add("xsmall", "dimmed", "age");
            age.innerHTML = this.translate("The current moon is ") + Math.round(this.info[4].age) + this.translate(" days old");
            wrapper.appendChild(age);


            // how much of the moon is illuminated
            var illumination = document.createElement("div");
            illumination.classList.add("xsmall", "dimmed", "illumination");
            illumination.innerHTML = this.translate("The moon is ") + Math.round(this.info[5].ill) + this.translate("% illuminated");
            wrapper.appendChild(illumination);

        return wrapper;
    },


    processLunartic: function(data) {
        this.info = data;
        this.loaded = true;
    },


    scheduleUpdate: function() {
        setInterval(() => {
            this.getLunartic();
        }, this.config.updateInterval);
        this.getLunartic(this.config.initialLoadDelay);
        var self = this;
    },

    getLunartic: function() {
        this.sendSocketNotification('GET_LUNARTIC');
        Log.info("GET_LUNARTIC sent.")
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "LUNARTIC_RESULT") {
            this.processLunartic(payload);
            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});
