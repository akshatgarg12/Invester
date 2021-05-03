import {loginWithGoogle} from '../../util/auth'

export interface AuthPageProps {
  
}
 
const AuthPage: React.FC<AuthPageProps> = () => {
  return (
    <div>
      <h1>Welcome to Invester</h1>
      <button onClick = {loginWithGoogle}> Login with Google </button>
    </div>
  );
}
 
export default AuthPage;