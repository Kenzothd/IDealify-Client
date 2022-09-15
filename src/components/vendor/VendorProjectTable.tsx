import React, {useEffect, useState, FC} from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridApi} from '@mui/x-data-grid';
import { Button } from '@mui/material';
import axios from "axios";
import urlcat from "urlcat";
const SERVER = import.meta.env.VITE_SERVER;
import format from "date-fns/format";
interface IActivities {
    _id: string,
    activityTitle: string,
    activityDescription: string,
    activityStartDate: Date,
    activityEndDate: Date,
    personInCharge: string,
    status: string,
    photos: Array<string>,
    __v?: number,
}

const VendorProjectTable : FC = ()=>{
    // we can also leave it uninitialized but add in <IActivities[] | undefined>
    const [activities, setActivities]= useState<IActivities[]>([]); 

    useEffect(()=>{
        const url = urlcat(SERVER, "/activities")
        axios.get(url).then(res=>setActivities(res.data)).catch((err)=>console.log(err))
    },[])

    const columns: GridColDef[] = [
        { field: 'activityTitle', headerName: 'Activity Title', width: 200 },
        { field: 'status', headerName: 'Status', width: 200 },
        { field: 'activityStartDate', headerName: 'Start Date', width: 200 },
        { field: 'activityEndDate', headerName: 'End Date', width: 200 },
        { field: 'personInCharge', headerName: 'Person In Charge', width: 200 },
        {
            field: "action",
            headerName: "Click To View",
            sortable: false,
            width: 200,
            renderCell: (params) => {
                const onClick = (e: React.MouseEvent) => {
                    console.log(e.target)
                    console.log(params.row)
                  };
                  return <Button onClick={onClick}>Click</Button>;
            }
          },
      ];
      
      const rows = activities.map((activity)=>{
        return {
            id: activity._id,
            activityTitle: activity.activityTitle,
            status: activity.status,
            activityStartDate: format(new Date(activity.activityStartDate),"dd/MM, hh:mm a"),
            activityEndDate: format(new Date(activity.activityEndDate),"dd/MM, hh:mm a"),
            personInCharge: activity.personInCharge,

        }
      })

        return (
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              
            />
            {/* <pre>{JSON.stringify(activities, null, 2)}</pre> */}
          </div>
        );
      }


export default VendorProjectTable;