import React from 'react';
import { TableContainer, Table, TableRow, TableCell, Paper, Link } from '@mui/material';
import { Skeleton } from '@mui/material';

const BasicStats = ({ data }) => {
  const columns = [
    { key: 'Sector', value: data?.sector },
    { key: 'Industry', value: data?.industry },
    { key: 'Exchange', value: data?.exchange },
    { key: 'Country', value: data?.country_name },
    { key: 'ISIN', value: data?.isin },
    { key: 'Ticker', value: data?.primary_ticker },
    {
      key: 'Web URL',
      value: (
        <Link href={data?.web_url} target="_blank" rel="noopener noreferrer">
          Link
        </Link>
      ),
    },
  ];

  return (
    <Paper elevation={3} sx={{ margin: 'auto', overflow: 'hidden', p: 0 }}>
      <TableContainer>
        <Table aria-label="Basic Stats Table">
          <TableRow>
            {columns.map((column, index) => (
              <React.Fragment key={index}>
                <TableCell style={{ paddingRight: '1px' }}>{column.key}:</TableCell>
                {data ? (
                  <TableCell style={{ paddingRight: '1px' }}><b>{column.value}</b></TableCell>
                ) : (
                  <TableCell style={{ paddingRight: '1px' }}>
                    <Skeleton variant="text" width={100} />
                  </TableCell>
                )}
                {index !== columns.length - 1 && <TableCell style={{ paddingRight: '1px' }}>|</TableCell>}
              </React.Fragment>
            ))}
          </TableRow>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default BasicStats;
