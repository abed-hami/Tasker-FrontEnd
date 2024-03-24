import { Component } from '@angular/core';
import { KanbanComponent } from "../kanban/kanban.component";

@Component({
    selector: 'app-todo',
    standalone: true,
    templateUrl: './todo.component.html',
    styleUrl: './todo.component.css',
    imports: [KanbanComponent]
})
export class TodoComponent {


}
