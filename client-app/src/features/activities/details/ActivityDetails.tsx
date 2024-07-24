import { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import ActivityDetialedHeader from './ActivityDetaledHeader';
import ActivityDetialedInfo from './ActivityDetailedinfo';
import ActivityDetialedChat from './ActivityDetailedChat';
import ActivityDetialedSideBar from './ActivityDetailedSideBar';
 

 


export default observer( function ActivityDetails( ){
  const{activityStore} = useStore();
 const {selectedActivity : activity, loadActivity, loadingInitial, clearSelectedActivity} = activityStore;
 const {id} = useParams();
 
useEffect(() => {
  if( id) loadActivity(id);
  return () => clearSelectedActivity();
}, [id, loadActivity, clearSelectedActivity]) 

 if( loadingInitial || !activity) return <LoadingComponent content={''  }/> ;



    return(
    <Grid>
      <Grid.Column width = {10}>
        <ActivityDetialedHeader activity = {activity}/> 
        <ActivityDetialedInfo activity = {activity}/> 
        <ActivityDetialedChat activityId={activity.id}/>  
      </Grid.Column>
       <Grid.Column width ={6}>
        <ActivityDetialedSideBar activity={activity}/>
       </Grid.Column>
    </Grid>
    )
})