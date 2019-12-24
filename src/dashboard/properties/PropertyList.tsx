import * as React from 'react'
import { Property } from '../../api/types'
import { useProperties, useSelectedProperty } from './data'
import './Property.css'

export interface IPropertyListProps {
    properties: Property[]
    selected: Property
    onPropertyClick: (property: Property) => void
}

export const PropertyList: React.FC<IPropertyListProps> = ({
    properties,
    selected,
    onPropertyClick,
}) => {
    console.log(selected)
    return (
        <ul className="properties">
            {properties.map(property => (
                <li
                    key={property.id}
                    className={
                        selected && selected.id === property.id && 'selected'
                    }
                    onClick={() => onPropertyClick(property)}
                >
                    {property.name} <br />
                    {property.address}
                </li>
            ))}
        </ul>
    )
}

export const PropertiesListContainer = () => {
    const { property, onPropertySelected } = useSelectedProperty()
    const { data } = useProperties()
    return (
        <div className="properties-pane">
            <h3>Properties</h3>
            <PropertyList
                onPropertyClick={onPropertySelected}
                properties={data || []}
                selected={property}
            />
        </div>
    )
}
