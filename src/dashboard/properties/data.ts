import { UserContext } from '../../auth/user'
import { useAsync } from '../../utils/async'
import { getPropertiesForUser } from '../../api/properties'
import { Property } from '../../api/types'
import { contextFromHook } from '../../utils/context'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

/**
 * a hook taking care of the list of properties (including the refetch when the user changes)
 */
export const useProperties = () => {
    const { user } = UserContext.use()
    const { setProperty } = SelectedPropertyContext.use()
    const asyncProperties = useAsync<Property[]>(async () => {
        const properties = await getPropertiesForUser(user.email)
        setProperty(properties[0])
        return properties
    })

    useEffect(() => {
        console.log('user changed', user)
        if (user) {
            asyncProperties.run()
        }
    }, [user])
    return asyncProperties
}

/**
 * sharing the currently selected property
 */
export const SelectedPropertyContext = contextFromHook(() => {
    const [property, setProperty] = useState<Property>()
    return { property, setProperty }
})

/**
 *
 */
export const useSelectedProperty = () => {
    const { property, setProperty } = SelectedPropertyContext.use()
    const history = useHistory()
    const onPropertySelected = (propertyToSelect: Property) => {
        setProperty(propertyToSelect)
        history.push('/dashboard/todos')
    }

    return {
        property,
        onPropertySelected,
    }
}
