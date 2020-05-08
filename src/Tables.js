import React, { Component, Fragment } from "react";
import Helpers from './Helpers';
import './index.css'
import { Button, Input, Modal, Table } from 'antd'

/**
 * @description 表格
 * @className Table
 */
class Tables extends Component
{
	constructor(props)
	{
		super(props);
		this.data = null;
		this.state = {
			visible    : false,
			dataSource : null,
		}
	}

	async componentDidMount()
	{
		const data = await Helpers.fetch('http://www.mocky.io/v2/5ea28891310000358f1ef182');
		if (!data) return;

		this.data = data.apis;
		this.setState({
			dataSource : data.apis,
		})
	}

	showModal = (item) => {
		this.setState({
			visible       : true,
			dataSourceTwo : item
		});
	};

	handleCancel = () => {
		this.setState({
			visible : false,
		});
	};

	handleSearchTow = (e) => {
		if (e.target.value.trim() === '') {
			this.setState({
				dataSource : this.data
			})
		} else {
			this.setState({
				dataSource : this.data.filter((todo) => {
					let arr = todo.tags;
					let str = arr.join('');
					return str.includes(e.target.value)
				})
			});
		}
	};

	render()
	{
		const columns = [
			{
				title     : 'Name',
				dataIndex : 'name',
			},
			{
				title     : 'Description',
				dataIndex : 'description',
				ellipsis  : true,
				width     : 300,
			},
			{
				title     : 'Image',
				dataIndex : 'image',
				render    : (item) => {
					return <img src={item} alt="image" />
				}
			},
			{
				title     : 'URL',
				dataIndex : 'baseURL',
				render    : (item) => {
					return <a href={item} target="_blank" rel="noopener noreferrer">链接</a>
				}
			},
			{
				title     : 'Tags',
				dataIndex : 'tags',
				render    : (item) => {
					return <span>
						{
							item.map((item, index) => {
								return <div key={index}>
									{item}
								</div>
							})
						}
					</span>
				}
			},
			{
				title     : 'Properties',
				dataIndex : 'properties',
				render    : (item) => {
					return <Button onClick={() => {
						this.showModal(item)
					}}>open model</Button>
				}
			},
		];

		const columnsTwo = [
			{
				title     : 'type',
				dataIndex : 'type',
			},
			{
				title     : 'url',
				dataIndex : 'url',
				ellipsis  : true,
				width     : "160"
			},
		];

		return (
			<Fragment>
				<Input
					placeholder="search tags"
					onChange={this.handleSearchTow}
				/>

				<Table
					columns={columns}
					dataSource={this.state.dataSource}
					bordered
					pagination={false}
				/>

				<Modal
					title="Basic Modal"
					visible={this.state.visible}
					onOk={this.handleCancel}
					onCancel={this.handleCancel}>
					<Table
						columns={columnsTwo}
						dataSource={this.state.dataSourceTwo}
						pagination={false}
						bordered
					/>
				</Modal>
			</Fragment>
		)
	}
}

export default Tables;