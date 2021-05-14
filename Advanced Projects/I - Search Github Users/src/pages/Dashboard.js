import React from 'react';
// Para não ter que importar individualmente cada um dos componentes, criamos um arquivo index.js lá na pasta componente e nele importamos individualmente cada um. Dessa forma aqui não precisamos escrever muito mais, ja que a pasta index é a selecionada atualmente e cada componente está selecionado corretamente lá
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';

const Dashboard = () => {
  const {isLoading} = React.useContext(GithubContext)

  if(isLoading){
    return <main>
      <Navbar />
      <Search /> 
      <img src={loadingImage}className='loading-img' alt='loading' />
    </main>
  }
  return (
    <main>
      <Navbar />
      <Search /> 
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
