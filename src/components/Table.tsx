import React from 'react';
import Project from './Project';
type ActualTableProps = {
    addresses: string[],
    id: number
}

const Table: React.FC<ActualTableProps> = ({ addresses, id }) => {
  return (
    <div className='w-2/3 mx-auto'>
        {addresses.map((address, index) => {
            return (
                <div key={index}>
                    <Project address={address} id={id} />
                </div>
            )
        })
        }
    </div>
    // <table>
    //   <thead>
    //     <tr>
    //       <th>Name</th>
    //       <th>Location</th>
    //       <th>Description</th>
    //       <th>Pictures</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {data.map((item, index) => (
    //       <tr key={index}>
    //         <td>{item.name}</td>
    //         <td>{item.location}</td>
    //         <td>{item.description}</td>
    //         <td>
    //           <table>
    //             <tbody>
    //               {item.pictureLinks.map((link, index) => (
    //                 <tr key={index}>
    //                   <td>
    //                     <img src={link} alt={`Picture ${index}`} />
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    //   <tfoot>
    //     <tr>
    //       <td>
    //         <button>Join</button>
    //       </td>
    //       <td>
    //         <button>Donate</button>
    //       </td>
    //       <td>
    //         <button>Admin</button>
    //       </td>
    //     </tr>
    //   </tfoot>
    // </table>
  );
};

export default Table;
