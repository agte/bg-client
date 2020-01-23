import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.teal.base,
        secondary: colors.blueGrey.darken3,
        accent: colors.red.darken1,
        error: colors.red.lighten1,
        info: colors.blue.lighten1,
        success: colors.teal.lighten1,
        warning: colors.deepOrange.lighten1,
      },
    },
  },
});
