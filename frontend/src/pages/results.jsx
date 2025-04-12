import React from 'react';
import './Results.css'; 

const Results = () => {
const styles = {
	container: {
		fontFamily: 'Arial, sans-serif',
		padding: '20px'
	},
	caseCard: {
		border: '1px solid #ccc',
		borderRadius: '8px',
		padding: '16px',
		marginBottom: '20px'
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	statusBadge: {
		backgroundColor: '#f0ad4e',
		color: '#fff',
		padding: '4px 8px',
		borderRadius: '4px'
	},
	caseInfo: {
		marginTop: '10px'
	},
	table: {
		width: '100%',
		borderCollapse: 'collapse',
		marginBottom: '20px'
	},
	th: {
		borderBottom: '2px solid #ccc',
		padding: '8px',
		textAlign: 'left'
	},
	td: {
		borderBottom: '1px solid #ccc',
		padding: '8px'
	},
	button: {
		backgroundColor: '#000',
		color: '#fff',
		padding: '10px 20px',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer'
	}
};

return (
	<div style={styles.container}>
		<h2>Search Results</h2>
		<div style={styles.caseCard}>
			<div style={styles.header}>
				<h3>Case #DL01MH0123452023</h3>
				<span style={styles.statusBadge}>Settlement in progress</span>
			</div>
			<div style={styles.caseInfo}>
				<p><strong>Court:</strong> Family Court</p>
				<p><strong>Filing Date:</strong> March 2, 2024</p>
				<p><strong>Judge:</strong> Hon. Ramesh Swaroop</p>
				<p><strong>Plaintiff:</strong> Satish Kumar</p>
				<p><strong>Defendant:</strong> Rupam Kumari</p>
				<p><strong>Next Hearing:</strong> May 25, 2024</p>
			</div>
		</div>
		<h3>Case Timeline</h3>
		<table style={styles.table}>
			<thead>
				<tr>
					<th style={styles.th}>Date</th>
					<th style={styles.th}>Event</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td style={styles.td}>March 2, 2024</td>
					<td style={styles.td}>Case Filed</td>
				</tr>
				<tr>
					<td style={styles.td}>April 10, 2024</td>
					<td style={styles.td}>Mediation Started</td>
				</tr>
			</tbody>
		</table>
		<button style={styles.button}>
			Get in touch with an advocate
		</button>
	</div>
);
};

export default Results;