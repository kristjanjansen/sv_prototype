### Templated

#### [/public/templates](public/templates)

[HandlebarsJS](http://handlebarsjs.com/) formaadis templatefailid. Nende kasutamine
on jälgitav **/public/js/app.js** failist.

### Leheküljed

#### [/public/pages](public/pages)

Lehekülgede struktuurifailid [YAML](http://www.yaml.org/spec/1.2/spec.html) formaadis, mille alusel genereeritakse templatede abil HTML fail. Valitavad URL ribalt **?theme=insert-pagename-here** parameetriga. 

### Themed

[/themes](themes)

[SASS](http://sass-lang.com/guide) (.scss) formaadis themefailid mille alusel genereeritakse **/public/themes** olevad CSS themefailid. Kõik themed impordivad **themes/default.scss** faili, mis omakorda impordib kõik Bootstrapi stiilid ning millele lisatakse mõned muutujate ülekirjutused.

[/public/themes](public/themes)

Genereeritud CSS themefailid, valitavad URL ribalt **?theme=insert-themename-here** parameetriga. Asendavad täielikult Bootstrapi CSSi.

**/generate-themes.sh**

SASS &rarr; CSS generaator, vajab eelnevalt [NodeJS installeerimist](http://nodejs.org/download) ning käsurealt järgneva sisestamist:

    npm install
    ./generate-themes.sh

