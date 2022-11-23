<template>
    <section class="w-100 p-8" style="background-color: #9A616D;">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col col-xl-10">
        <div class="card" style="border-radius: 1rem;">
          <div class="row g-0">
            <div class="col-md col-lg d-flex align-items-center">
              <div class="card-body text-black">
                <form @submit.prevent="login">
                  <div class="align-items-center mb-3 pb-1">
                    <span class="h3 fw-bold mb-0" style="margin-top: 5px; margin-left: 250px;">SIGN IN YOUR ACCOUNT </span>
                  </div>
                  <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example17">Email address</label>
                    <input type="email" class="form-control" v-model="user.email" />
                  </div>
                  <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example27">Password</label>
                    <input type="password" id="form2Example27" class="form-control" v-model="user.password" />
                    
                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                  </div>
                  <p class="mb-2 small text-muted" style="color: #393f81;">Don't have an account? <a href="#!"
                      style="color: #393f81;">Register here</a></p>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</section>
</template>

<script setup>
import axios from 'axios';
import {reactive} from 'vue';
const user = reactive({
    email: '',
    password: '',
})

const router = useRouter()

function login(){
    try {
        axios.post("http://localhost:3000/api/1.0/login", {
            email: user.email,
            password: user.password
        }).then(r => {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + r.data.token;
            localStorage.setItem( 'token', JSON.stringify(r.data.token) );
            alert('Login Success')
            router.push("/dashboard", setTimeout(function(){
                
                location.reload();
            }, 1000))
            
        });
    } catch (err) {
        console.log(err);
    }
}
</script>