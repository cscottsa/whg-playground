<template>
  <div class="app">
    <navigation></navigation>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import api from '@API';
import Navigation from '@Component/Layout/Navigation.vue';

export default {
  name: 'App',
  components: {
      'navigation': Navigation
  },
  computed: {
    ...mapGetters({
      getGamesList: 'getGamesList'
    })
  },
  created() {
    api
      .get(
        `http://stage.whgstage.com/front-end-test/games.php`,
        { withCredentials: false }
      )
      .then(gamesResp => {
        this.setGamesList(gamesResp.data)
        this.setNavigationList(
          this.buildNavigationList(gamesResp.data)
        )

        this.getJackpotUpdates()
        this.getJackpotUpdatesEveryTenSeconds()
      })
      .catch(e => {
        console.error(e);
      });

  },
  methods: {
    ...mapActions({
      setGamesList: 'SET_GAMES_LIST',
      setNavigationList: 'SET_NAVIGATION_LIST'
    }),
    buildNavigationList (games) {
      let navList = []

      // Add unique categories to navList
      games.forEach(game => {
        game.categories.forEach(category => {
          if (!navList.includes(category)) {
            if (['ball', 'virtual', 'fun'].includes(category))
              return
              
            navList.push(category)
          }
        })
      });

      // Capitalize the first letter of each category name and create path
      for (let i = 0; i < navList.length; i++) {
        navList[i] = {
          name: navList[i].charAt(0).toUpperCase() + navList[i].slice(1),
          path: navList[i]
        }
      }

      return navList
    },
    buildJackpotsIntoGamesList(games, jackpots) {
      let updatedGamesList = {};

      if (Array.isArray(games)) {
        // Build gamesList into an indexable object, will only run on first page load
        for (let i = 0; i < games.length; i++) {
          updatedGamesList[games[i].id] = games[i]
        }
      } else {
        updatedGamesList = games
      }

      // Add jackpot amount to updatedGamesList
      for (let j = 0; j < jackpots.length; j++) {
        updatedGamesList[jackpots[j].game].jackpotAmount = jackpots[j].amount
      }

      return updatedGamesList
    },
    getJackpotUpdates () {
      api
        .get(
          `http://stage.whgstage.com/front-end-test/jackpots.php`,
          { withCredentials: false }
        )
        .then(jackpotsResp => {
          this.setGamesList(
            this.buildJackpotsIntoGamesList(this.getGamesList, jackpotsResp.data)
          )
          console.log('JACKPOTS UPDATED!')
        })
        .catch(e => {
          console.error(e)
        });
    },
    getJackpotUpdatesEveryTenSeconds () {
      setTimeout(() => {
        this.getJackpotUpdates()
        this.getJackpotUpdatesEveryTenSeconds()
      }, 10000)
    }
  }
};
</script>

<style lang="scss">
@import '../../scss/master.scss';
</style>
