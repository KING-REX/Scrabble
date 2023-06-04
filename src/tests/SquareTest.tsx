import { View, Text } from 'react-native'
import React from 'react'
import Square from '../components/SquareComponent'
import { ShadowTile } from '../components/TileComponent'

const SquareTest = () => {

    const tile = <ShadowTile letter='E' tileLength={70} />;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Square
                length={75}
                coordinateX={0}
                coordinateY={0}
                tile={<ShadowTile letter='E' tileLength={70} />}
            />
        </View>
    )
}

export default SquareTest