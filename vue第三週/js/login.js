const { createApp } = Vue;
const url = "https://vue3-course-api.hexschool.io/v2";
const path = "lee-ren";
//測試串接
axios.get(`${url}/api/${path}/products/all`)
.then((res) => {
    console.log(res);
})


const app = {
    data(){
        return{
            user: {
                username: '',
                password: '',
              },
        }
    },
    methods: {
        login(){
            axios.post(`${url}/admin/signin`,this.user)
            .then((res) => {
                // console.log(res);
                const { token, expired } = res.data;
                console.log(token,expired);
                document.cookie = `hexToken=${token};expires=${expired};`;
                axios.defaults.headers.common["Authorization"] = token;//登入成功時
                window.location = 'products.html';
            })
        }
    },
    mounted() {
        console.log(this);
    },
}

createApp(app).mount('#app')

