<template>
    <header>
      <img src="https://img.icons8.com/cotton/2x/cheeseburger.png" class="icon-hamburger" />
      <nav>
        <ul class="list">
          <li
            v-for="item in getNavigationList"
            :key="item.path"
            class="list__item"
            :class="{ active: $route.path.includes(item.path)}"
          >
            <router-link :to="{ path: item.path }">
              {{ item.name }}
            </router-link>
          </li>
          <li
            class="list__item"
            :class="{ active: $route.path.includes('other') }"
          >
            <router-link to="/other">Other</router-link>
          </li>
        </ul>
      </nav>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Navigation',
  computed: {
    ...mapGetters({
      getNavigationList: 'getNavigationList'
    })
  }
};
</script>

<style lang="scss" scoped>
@import '../../scss/master.scss';

header {
    background-color: $mineshaft;
}

nav {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;

  @media (max-width: 768px) {
    display: none;
  }
}

.list {
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: center;

  &__item {
    color: white;
    &:hover {
      background-color: $sushi;
    }
    &.active {
      background-color: $sushi;
    }

    a {
      display: block;
      color: $white;
      font-size: 16px;
      text-decoration: none;
      padding: 0.5em 1.5em;
    }
  }
}

.icon-hamburger {
  display: none;
  height: 32px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block
  }
}
</style>
