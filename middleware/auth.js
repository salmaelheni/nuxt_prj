// middleware/auth.js
export default function({ store, redirect }) {
    if (!store.state.token) {
      return redirect('/login/loginPage')
    }
  }
  