import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button as BootstrapButton,
  Container,
  Col,
  Row,
  Form,
} from 'reactstrap';
import Input from '../../Components/Input/index.js';
import Icon from '../../Components/Icon';
import styles from './style.module.scss';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    // TODO: build login functionality
  };

	return (
		<div className={styles.container}>
			<div className={styles.borderspace} />
			<div className={styles.mainspace}>
				<Container className="h-100 row align-items-center">
					<Row>
						<Col lg={10} className="mx-auto">
							<Row className={styles.titlerow}>
								<Col sm={6}>
									<Icon name="bananaIcon" size={200} />
								</Col>
								<Col sm={6}>
									<h1 className={styles.title}>BANANA PORTAL</h1>
								</Col>
							</Row>
							<Form sm={12} className="mx-auto">
								<Input
									id="email"
									name="email"
									iconName="user"
									placeholder="Email"
									className={styles.inputrow}
									value={email}
									setValue={setEmail}
								/>
								<Input
									id="password"
									name="password"
									iconName="lock"
									placeholder="Password"
									type="password"
									onChange={setPassword}
									className={styles.inputrow}
									value={password}
									setValue={setPassword}
								/>
								{/* TODO: allow Input to return a Button object */}
								<div className="mt-5 mx-5 row row-cols-2 formSubmit">
									<BootstrapButton
										className={`col ${styles.button}`}
										onClick={onSubmit}
									>
										Login
									</BootstrapButton>
									<a href="/" className="col">
										<p>Forgot password?</p>
									</a>
								</div>
							</Form>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
}
