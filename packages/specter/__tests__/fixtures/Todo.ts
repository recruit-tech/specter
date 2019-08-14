import { Request, Response, Service } from "../../src";
export type task = { title: string, desc: string, done: boolean };
export type tasks = task[];

type CreateRequest = Request<{}, {}, { task: task }>;
type CreateResponse = Response<{}, { task: task, id: number }>;
type ReadRequest = Request<{}, { id: number }, null>;
type ReadResponse = Response<{}, { task: task, id: number }>;
type ListRequest = Request<{}, {}, null>;
type ListResponse = Response<{}, {tasks: tasks}>;
type UpdateRequest = Request<{}, { id: number }, { task: task}>;
type UpdateResponse = Response<{}, { id: number, task: task}>;
type DeleteRequest = Request<{}, { id: number }, null>;
type DeleteResponse = Response<{}, null>;

export default class Todo extends Service {
  todos: task[];
  constructor() {
    super("todo", {});
    this.todos = [];
  }
  async create(request: CreateRequest): Promise<CreateResponse> {
    this.todos.push(request.body.task);
    return new Response({}, { task: request.body.task, id: this.todos.length - 1 });
  }
  async read(request: ReadRequest): Promise<ReadResponse> {
    const { id } = request.query;
    const todo = this.todos[id];
    if (!todo) {
      const result = new Response({}, {
        id,
        task: todo,
      });
      result.setStatus(404);
      result.setError("Todo Not Found");
      return result;
    }
    const result = new Response({}, { id, task: todo });
    return result;
  }
  async list(request: ListRequest): Promise<ListResponse> {
    const result = new Response({}, { tasks: this.todos });
    return result;
  }
  async update(request: UpdateRequest): Promise<UpdateResponse> {
    const { id } = request.query;
    const todo = this.todos[id];
    if (!todo) {
      const result = new Response({}, {
        id,
        task: todo,
      });
      result.setStatus(404);
      result.setError("Todo Not Found");
      return result;
    }
    this.todos[id] = request.body.task;
    const result = new Response({}, { id, task: this.todos[id] });
    return result;
  }
  async delete(request: DeleteRequest): Promise<DeleteResponse> {
    const todo = this.todos[request.query.id];
    if (!todo) {
      const result = new Response({}, null);
      result.setStatus(404);
      result.setError("Todo Not Found");
      return result;
    }
    delete this.todos[request.query.id];
    const result = new Response({}, null);
    result.setStatus(204);
    return result;
  }
}