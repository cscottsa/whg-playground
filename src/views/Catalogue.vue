<template>
    <div class="catalogue layout">
        <div class="catalogue-tile-container">
          <catalogue-tile
            v-for="(game, index) in gamesByRoute()"
            :key="game.name + index"
            :game="game"
          ></catalogue-tile>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import CatalogueTile from '../components/Partials/CatalogueTile.vue'

export default {
  name: 'Catalogue',
  components: {
    'catalogue-tile': CatalogueTile
  },
  computed: {
    ...mapGetters({
      getGamesList: 'getGamesList'
    })
  },
  methods: {
    ifRouteMatchesGameCategory (game) {
      if (this.$route.path == '/other') {
        let categoriesToInclude = ['ball', 'virtual', 'fun']

        for (let i = 0; i < categoriesToInclude.length; i++) {
          if (game.categories.includes(categoriesToInclude[i]))
            return true
        }
        return false
      }

      return game.categories.includes(this.$route.path.slice(1))
    },
    gamesByRoute () {
      let filteredGames = []

      // Filter games by current category selected
      for (var key in this.getGamesList) {
        // Route path is included in game category or included in list
        if (this.ifRouteMatchesGameCategory(this.getGamesList[key])) {
          filteredGames.push(this.getGamesList[key])
        }
      }

      return filteredGames
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  max-width: 1024px;
  margin: 0 auto;
}

.catalogue {
  position: relative;
  padding: 30px 0;
}

.catalogue-tile-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
</style>
