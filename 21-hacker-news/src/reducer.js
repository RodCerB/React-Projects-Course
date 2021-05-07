import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'

const reducer = (state, action) => {
  // nos ultimos projetos nós trabalhos da seguinte forma: 'if(action.type{...})' , mas dessa vez faremos de outro modo muito utilizado:
  switch(action.type){
    // Assim como no context, vamos trocar string pela variavel para não ter chance de errar:
    // case'SET_LOADING':
    case SET_LOADING:
      return {...state, isLoading:true}
    case SET_STORIES:
      return {...state, 
        isLoading:false, 
        hits: action.payload.hits, 
        nbPages: action.payload.nbPages,}
    case REMOVE_STORY:
      return {...state,
        // vamos retornar apenas as histórias que o id não bate com o da história que clicamos para excluir 
        hits: state.hits.filter((story)=> story.objectID !== action.payload)}
    case HANDLE_SEARCH:
      return {...state, 
        query: action.payload,
        page: 0}
    case HANDLE_PAGE:
      if(action.payload === 'inc'){
        let nextPage = state.page + 1
        // precisamos fazer a seguinte correção pq nessa api começamos na pagina 0, ele diz que tem 50 no total mas na real tem 49. Por isso fazemos essa artemanha de diminuir 1 e lá no componente dos botões nós colocamos +1 na página
        if(nextPage > state.nbPages -1){
          nextPage = 0
        }
        return {...state, page: nextPage}
      }
      if(action.payload === 'dec'){
        let prevPage = state.page - 1
        if(prevPage < 0){
          prevPage = state.nbPages - 1
        }
        return {...state, page: prevPage}
      }
      
  //precisamos criar um default case para caso de nenhuma das actions passarem
  default:
    throw new Error (`no matching "${action.type}" action`)
  }
}
export default reducer
