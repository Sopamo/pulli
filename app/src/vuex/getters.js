import Server from '../models/Server'

export const servers = state => state.servers.servers.map(server => new Server(server))
export const terminals = state => state.terminals.terminals
export const tasks = state => state.tasks.tasks
