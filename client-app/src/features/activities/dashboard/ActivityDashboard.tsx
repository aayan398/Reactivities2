import { useEffect, useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import ActivityFilters from "./ActivityFilters";
import { PagingParams } from "../../../app/layout/models/paginations";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";
 
 
 
  export default observer( function ActivityDashboard( ){
    const{activityStore} = useStore();
    const {loadActivities, activityRegistry, setPagingParams, pagination} = activityStore;
    const[loadingNext, setLoadingNext] =useState(false);

    function handleGetNext(){
       setLoadingNext(true);
       setPagingParams(new PagingParams(pagination!.currentPage + 1))
       loadActivities().then(() => setLoadingNext(false));
      
    }

   useEffect(()=> {
    if (activityRegistry.size <= 1) loadActivities();
   }, [loadActivities, activityRegistry.size])  ///just incase something goes wrong get rid of activityRegistry

    if(activityStore.loadingInitial && !loadingNext) return <LoadingComponent content='Loading activities...' />

     return(
         <Grid>
              <Grid.Column width= '10'>
                {activityStore.loadingInitial && activityRegistry.size === 0 && !loadingNext ? (
                  <>
                     <ActivityListItemPlaceholder />
                     <ActivityListItemPlaceholder />
                  </>
                ): (
               <>
                  <ActivityList />
                  <Button 
                  floated="right"
                  content='More'
                  positive
                  onClick={handleGetNext}
                  loading = {loadingNext}
                  disabled={pagination?.totalPages === pagination?.currentPage}
                  /> 
                  </>
                )}
             </Grid.Column>
             <Grid.Column width='6'> 
               <ActivityFilters />
              </Grid.Column>
         </Grid> 
     )
  })