<template>
    <div class="catalogue-tile">
        <!-- I created my own bages as your badge links in test doc is broken -->
        <span v-if="isNew(game)" class="badge-new">NEW</span>
        <span v-if="isTop(game)" class="badge-top">TOP</span>
        <span v-if="game.jackpotAmount" class="catalogue-tile__jackpot">&euro; {{ game.jackpotAmount | addCommas }}</span>
        <span class="catalogue-tile__name">{{ game.name }}</span>
        <img src="https://img.icons8.com/flat_round/2x/play.png" class="icon-play" />
        <img :src="game.image" class="catalogue-tile__background" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CatalogueGame',
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getGamesList: 'getNavigationList'
    })
  },
  filters: {
    addCommas (number) {
      let newStringVal
      if (!number) return ''

      newStringVal = number.toString()

      // Copied from slackoverflow link below, because why the fuck would I care to know this regex by heart lol
      // https://stackoverflow.com/questions/1990512/add-comma-to-numbers-every-three-digits/1990590
      return newStringVal.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    }
  },
  methods: {
    isNew (game) {
      if (!this.$route.path.includes('new') && game.categories.includes('new')) {
        return true
      }
      return
    },
    isTop (game) {
      if (!this.$route.path.includes('top') && game.categories.includes('top')) {
        return true
      }
      return
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../scss/master.scss';

$tile-height: 100px;
$tile-width: 170px;

.catalogue-tile {
  position: relative;
  height: $tile-height;
  width: $tile-width;
  box-sizing: border-box;
  margin: 0 4px 20px 4px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    .icon-play {
      display: block;
    }

    .catalogue-tile__name {
      display: block;
    }
  }

  &__background {
    height: $tile-height;
    width: $tile-width;
    border-radius: 8px;
  }

  &__jackpot {
    position: absolute;
    top: 0;
    width: 100%;
    height: 25px;
    font-size: 12px;
    font-weight: 600;
    color: $white;
    text-align: center;
    line-height: 2;
    text-transform: uppercase;
    background: rgba(0, 0, 0, 0.6);
  }

  &__name {
    display: none;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 25px;
    font-size: 10px;
    font-weight: 600;
    color: $white;
    text-align: center;
    line-height: 2;
    text-transform: uppercase;
    background: rgba(0, 0, 0, 0.7);
  }

  // I created my own bages as your badge links in test doc is broken
  .badge-new, .badge-top {
    position: absolute;
    display: block;
    text-align: center;
    font-weight: 600;
    line-height: 1.4;
    height: 17px;
    width: 100px;
    top: 16px;
    right: -30px;
    transform: rotate(50deg);
    box-shadow: 2px 2px #888888;
    z-index: 10;
  }

  .badge-new {
    background-color: green;
    color: $white;
  }

  .badge-top {
    background-color: $alabaster;
    color: green;
  }
}

// I added my own play icon as there were no icons provided
.icon-play {
  display: none;
  position: absolute;
  height: 40px;
  width: 40px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 999999;
}
</style>
