import { Cell, Column, Table } from "@blueprintjs/table";
import { Task } from "../App";


interface ActiveTaskProps {
    activeTasks: Array<Task>;
}

export function ActiveTasks(props: ActiveTaskProps) {
    const cellRenderer = (rowIndex: number) => {
        return <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
    };
    return (<Table numRows={10}>
        <Column name="Dollars" cellRenderer={cellRenderer}/>
    </Table>);
}