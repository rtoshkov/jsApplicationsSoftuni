import {html} from '../libs.js';
import {login} from '../api.js';

const loginTemplate = (onSubmit) => html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        ${formTemplateLogin(onSubmit)}
    </div>`


const formTemplateLogin = (onSubmit) => html`
    <form @submit =${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class="form-control" id="email" type="text" name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class="form-control" id="password" type="password" name="password">
                </div>
                <input type="submit" class="btn btn-primary" value="Login" />
            </div>
        </div>
    </form>`

export function displayLogin(ctx){
    ctx.render(loginTemplate(onSubmit));
    const context  = ctx;
    async function onSubmit(e){
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        }

        if(data.email === '' || data.password === ''){
            alert('all fields are required');
            return;
        }
        await login(data.email, data.password);
        context.updateNav();
        context.page.redirect('/')
    }
}
