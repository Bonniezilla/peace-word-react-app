import SignInButton from "./SignInButton";

export default function LoginBox(props) {
    return (
        <div className="flex flex-col bg-slate-700 rounded-lg w-96 h-96 items-center py-6
        px-2 gap-4">
            <h1 className="text-emerald-500 font-bold text-3xl
            ">Login</h1>
            <input className="login-input" type="email" name="" id="" />
            <input className="login-input" type="password" name="" id="" />
            <input className="bg-emerald-500 w-3/5 rounded-lg text-white hover:text-emerald-500
            hover:bg-white duration-500 hover:tracking-widest cursor-pointer h-12"
            type="submit" value="Login" />
            <SignInButton text="Continue with Google" provider="google" />
        </div>
    )
}