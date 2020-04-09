import React from 'react';
import { connect } from 'react-redux';


class Login extends React.Component {
    
    state = {
        value: ''
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    handleLogIn = (e) => {
        e.preventDefault();
        this.props.handleAuthedUser(this.state.value);
    }
    
    render () {
        const { userIds, users } = this.props;
        return (
            <div className="col-9 mx-auto">
                {/* Login Card */}
                <div className="card login-card rounded border-primary">
                    <div className="card-content p-4 text-center text-dark">
                        <h2 className="md-font-size">Welcome to the Would You Rather App!</h2>
                        <p>Please Sign in to Continue</p>
                        <form onSubmit={this.handleLogIn}>
                            <select value={this.state.value} className="custom-select" id="select-login" onChange={this.handleChange}>
                            <option value={null}>Choose...</option>
                                {userIds.map(id => <option key={id} value={id}>{users[id].name}</option>)}                            
                            </select>
                            <button type="submit" className="btn btn-lg btn-primary mt-4">Sign In</button>
                        </form>
                    </div>
                </div>
                {/* End Login Card */}
            </div>
        );
    };
}

function mapStateToProps ({users}) {
    return {
        users,
        userIds: Object.keys(users)
    }
}

export default connect(mapStateToProps)(Login);