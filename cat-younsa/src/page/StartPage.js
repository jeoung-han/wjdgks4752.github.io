import './css/StartPage.css';

function login() {

    const [login, setLogin] = useStats("true");

    return (
        <div>
            <label htmlFor="">id</label><input type="text" />
            <label htmlFor="">password</label><input type="password" />
            <button>game start</button>
            <button>ranck</button>
        </div>
    );
}

function beforeLogin() {
    return (
        <div>
            
        </div>
    );
}

function StartPage() {
    return (
        <div id="StartPage" className="page-container">
            <section>
                <div>고양이</div>                
                <div>용사</div>
            </section>
            <section>
                
            </section>
        </div>
    );
}

export default StartPage;