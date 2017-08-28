<template>
    <div class="landing-page">
      <ul>
          <li v-for="room in $store.state.rooms">
              {{room.name}}
          </li>
      </ul>
      <div class="hero-image">
          <div class="hero-text">
              <h2 class="hero-title">Ketchup</h2>
              <p class="hero-subline">Let's meet in the middle</p>
          </div>
          <button class="start-action-button hero-button">Get started</button>
          <img class="down-chevron" src="assets/down-chevron.png" />
      </div>
      <div class="how-it-works">
          <h3 class="section-header">How It Works</h3>
          <div class="how-it-works-steps">
              <div class="create-room teaser">
                  <div class="foto"><img src="assets/room.png" /></div>
                  <p>Create a room</p>
              </div>
              <div class="arrow"></div>
              <div class="invite-friends teaser">
                  <div class="foto"><img src="assets/friends.png" /></div>
                  <p>Invite friends</p>
              </div>
              <div class="arrow"></div>
              <div class="see-updates teaser last">
                  <div class="foto"><img src="assets/updates.png" /></div>
                  <p>See live updates</p>
              </div>
          </div>
          <img class="down-chevron" src="assets/down-chevron.png" />
      </div>
      <div class="how-to-use-it">
          <h3 class="section-header">How To Use It</h3>
          <div class="how-to-use-it-steps">
              <div class="step">
                  <div class="guide-foto"><img src="assets/create-room-intro.png" /></div>
                  <p>Create a new room</p>
              </div>
              <div class="arrow"></div>
              <div class="step">
                  <div class="guide-foto"><img src="assets/copy-public-link.jpg" /></div>
                  <p>Copy the link to the room and send it to your friends, e.g. via email</p>
              </div>
              <div class="arrow"></div>
              <div class="step">
                  <div class="guide-foto"><img src="assets/map-locations.png" /></div>
                  <p>See your and their location live on the map</p>
              </div>
          </div>
          <img class="down-chevron" src="assets/down-chevron.png" />
      </div>
      <footer class="action-footer">
          <button class="start-action-button">Get started</button>
      </footer>
     </div>
</template>

<script>
export default {
  name: 'landing-page',
  data () {
    return {
      randomProp: 'Random prop'
    }
  }
}
</script>
<style lang="scss" src="../public/styles.scss" scoped></style>
