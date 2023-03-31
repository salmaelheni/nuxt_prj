<template>
  <!-- Loading -->
  <LoadingComponent v-if="$fetchState.pending" />

  <!-- Movie Info -->
  <div v-else>
    <!-- Navbar -->
    <NavbarComponent />
    <div v-if="account" class="account-section">
      <div class="avatar">
        <div v-if="account.avatar.gravatar.hash">
          <img :src="`https://image.tmdb.org/t/p/w400/${account.avatar.gravatar.hash}`" alt="Avatar" class="mr-3">
        </div>
        <div v-else class="">
          <div class="no_avatar">No user image is available</div>
        </div>
      </div>
      <div class="name">{{ account.name }}</div>
      <div class="username">@{{ account.username }}</div>
    </div>
    <div v-else>
      <div class="no_account">No account data is available</div>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import NavbarComponent from '../../components/NavbarComponent.vue'
import LoadingComponent from '../../components/LoadingComponent.vue'
export default {

  name: 'SingleMovie',
  components: { LoadingComponent, NavbarComponent },
  middleware: 'auth',
  data() {
    return {
      account: '',
      session:''
    }
  },
  async fetch() {
    await this.getAccountData()
    // eslint-disable-next-line no-console
  },
  computed: {
    sessionid() {
      return this.$store.state.sessionid
    },
    ...mapState(['sessionid'])
  },
  // delay for fetching
  fetchDelay: 1000,
  methods: {
    async getAccountData() {
      try {
        const data = axios.get(
          `https://api.themoviedb.org/3/account?api_key=c3973a7fdda35b0058bef3411c380b1d&session_id=${this.sessionid}`
        )

        const result = await data
        this.account = result.data
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log("no account data",err.status_message);
      }

    }
  },
}
</script>

<style scoped>
.account-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: white;
}

.username,
.no_account,
.no_avatar {
  font-size: 16px;
  color: white;
}
</style>