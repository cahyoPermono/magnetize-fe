<template>
  <div>
    <Toast />
  <div
    class="card text-center"
    style="height: 41rem; padding-top: 10px; padding: 50px"
  >
    <Form @submit="login">
      <div
        class="card-header"
        style="text-align: center; background-color: #129666"
      >
        <h4>SIGN IN YOUR ACCOUNT</h4>
      </div>
      <div class="card-body">
        <div class="mt-4">
          <div class="row">
            <label for="email" class="col-sm-2 col-form-label">Email </label>
            <div class="col-sm">
              <Field
                class="form-control"
                name="email"
                type="email"
                :rules="isRequired"
                v-model="user.email"
              />
              <ErrorMessage name="email">
                <small style="color: red">Email is required</small>
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="row">
            <label for="password" class="col-sm-2 col-form-label">
              Password
            </label>
            <div class="col-sm">
              <Field
                class="form-control"
                name="password"
                type="password"
                :rules="isRequired"
                v-model="user.password"
              />
              <ErrorMessage name="password">
                <small style="color: red">Password is required</small>
              </ErrorMessage>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer text-muted">
        <Button class="p-button-sm p-button-text" disabled />
        <Button
          class="p-button-sm"
          icon="pi pi-sign-in"
          type="submit"
          style="float: right"
        />
      </div>
    </Form>
  </div>
</div>
</template>

<script setup>
import axios from "axios";
import { reactive, onMounted } from "vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const user = reactive({
  email: "",
  password: "",
});

const router = useRouter();
const token = useCookie('token');
const userdata = useCookie('user');

function login() {
  try {
    axios
      .post("http://localhost:3000/api/1.0/login", {
        email: user.email,
        password: user.password,
      })
      .then(async (r) => {
          axios.defaults.headers.common["Authorization"] =
          "Bearer " + r.data.token;
          token.value = r.data.token;
          userdata.value = r.data.user.roleId
          
        // alert("Login Success");
        router.push("/dashboard");
      })
      .catch((err) => {
        // alert(err.response.data.error)
            toast.add({severity:'error', summary: 'Error', detail:'Email or Password incorrect', life: 3000});
      });
  } catch (err) {
    console.log(err);
  }
}
const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};
definePageMeta({
  layout: false,
  middleware: 'islogin'
});
</script>
