import '@styles/globals.css'
import Provider from '@components/Provider'
import Nav from '@components/nav'

export const metadata = {
	title: "Promptopia",
	description: "Discover & Share AI Prompts"
}

const RootLayout = ({ children }) => {
  return (
	<html lang="en">
		<Provider>
			<body>
				<div className="main">
					<div className="gradient"/>
				</div>

				<main className="app">
					<Nav />
					{ children }
				</main>
			</body>
		</Provider>
	</html>
  )
}

export default RootLayout
