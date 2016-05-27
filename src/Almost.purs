module Almost where

import Data.Maybe (Maybe)
import Control.Monad.Eff (Eff, Pure)

newtype Undefined a = Undefined (Maybe a)

foreign import data Subject :: * -> *
foreign import data Stream :: * -> *
foreign import data Promise :: * -> *

{-Sad subject type stuff -}
foreign import subject :: forall a. Subject a
foreign import holdSubject :: forall a. Int -> Subject a

foreign import next :: forall a. a -> Subject a -> Pure (Subject a)
foreign import complete :: forall a. a -> Subject a -> Pure (Subject a)

{- create streams -}

foreign import just :: forall a. a -> Stream a
foreign import empty :: forall a. a -> Stream (Undefined a)
foreign import never :: forall a. a -> Stream (Undefined a)
foreign import periodic :: Int -> forall a. a -> Stream a

{- consume streams -}
foreign import observe :: forall a b eff. (a -> Eff eff b) -> Stream a -> Promise a
foreign import drain :: forall a. Stream a -> Promise a
{- then a Promise -}
foreign import thenp :: forall a b. (a -> b) -> Promise a -> Promise b

{- combinators -}
foreign import map :: forall a b. (a -> b) -> Stream a -> Stream b
foreign import tap :: forall a. (a -> (Undefined a)) -> Stream a -> Stream a
foreign import filter :: forall a. (a -> Boolean) -> Stream a -> Stream a
