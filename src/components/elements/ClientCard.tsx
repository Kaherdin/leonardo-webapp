import { Client } from '@/types/client'
import React from 'react'
import { FadeIn } from '../ui/FadeIn'
import { Border } from '../ui/Border'
import { Cloud } from 'lucide-react'
import NextCloudinaryImage from '../images/ImageNextCloudinary'

interface ClientCardProps {
  client: Client
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  return (
    <>
      <FadeIn className="overflow-hidden">
        {client?.logo && (
          <NextCloudinaryImage
            width={160}
            height={80}
            alt={client?.logo?.alternativeText}
            src={`${client?.logo?.url}`}
            crop="fit"
          />
        )}
      </FadeIn>
      {/* <div className="text-center">
        <h2 className="text-xl font-bold">{client.name}</h2>
      </div> */}
    </>
  )
}

export default ClientCard
