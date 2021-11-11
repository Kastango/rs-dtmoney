import styled from 'styled-components';

export const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 2rem;
	margin-top: -7rem;

	div {
		background: var(--shape);
		padding: 1.5rem 2rem;
		border-radius: 0.25rem;
		color: var(--text-title);

		header {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		strong {
			display: block;
			margin-top: 1rem;
			font-size: 2rem;
			font-weight: 500;
			line-height: 3rem;
		}
		
		&.highlight-background {
			background: var(--green);
			color: #fff;

			@media (max-width: 839px)
			{
				grid-column:1/3;
			}

			@media (max-width: 555px)
			{
				grid-column: 1
			}
		}
	}
`;
