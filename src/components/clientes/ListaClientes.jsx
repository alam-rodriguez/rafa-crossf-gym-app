import React from 'react'

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

const ListaClientes = ({clientes}) => {
  return (
    
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>TELEFONO</TableColumn>
          <TableColumn>ESTADO</TableColumn>
          <TableColumn>PROXIMO PAGO EN</TableColumn>
        </TableHeader>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow key={cliente.id}>
              <TableCell>{cliente.nombre}</TableCell>
              <TableCell>{cliente.telefono}</TableCell>
              <TableCell>{cliente.estado}</TableCell>
              <TableCell>5 DIAS</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    
    
  )
}

export default ListaClientes
