package keeper

import (
	"voter/x/voter/types"
)

var _ types.QueryServer = Keeper{}
