import {html} from '../libs.js';
import {register} from "../api.js";

const registerTemplate = (onSubmit)=> html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Register New User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit = ${onSubmit}>
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
                <div class="form-group">
                    <label class="form-control-label" for="rePass">Repeat</label>
                    <input class="form-control" id="rePass" type="password" name="rePass">
                </div>
                <input type="submit" class="btn btn-primary" value="Register" />
            </div>
        </div>
    </form>`

export function displayRegister(ctx){
    ctx.render(registerTemplate(onSubmit));
    const context = ctx
    async function onSubmit(e){
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        const rePass = formData.get('rePass');

        if (email === '' || password === '') {
            alert('All fields should be filled in');
            return;
        }

        if (password !== rePass){
            alert('Passwords don\'t match');
            return;
        }

        await register(email,password);
        context.updateNav();
        context.page.redirect('/');
    }
}